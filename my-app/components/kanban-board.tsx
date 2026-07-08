"use client";

import { deleteColumn } from "@/lib/actions/columns";
import { useBoard } from "@/lib/hooks/useBoard";
import { Board, Column, JobApplication } from "@/lib/models/models.types";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Mic,
  MoreVertical,
  Music,
  Star,
  Trash2,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateColumnDialog from "./create-column-dialog";
import CreateJobApplicationDialog from "./create-job-application-dialog";
import JobApplicationCard from "./job-application-card";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface KanbanBoardProps {
  board: Board;
  userId: string;
}

interface ColConfig {
  color: string;
  icon: React.ReactNode;
}

const DEFAULT_COLUMN_CONFIG: Record<string, ColConfig> = {
  "Wish List": {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  Applied: {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  Interviewing: {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  Offer: {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  Rejected: {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
};

const COLOR_CONFIG: Record<string, string> = {
  cyan: "bg-cyan-500",
  purple: "bg-purple-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500",
  emerald: "bg-emerald-500",
  neutral: "bg-neutral-500",
};

const ICON_CONFIG: Record<string, React.ReactNode> = {
  calendar: <Calendar className="h-4 w-4" />,
  check: <CheckCircle2 className="h-4 w-4" />,
  mic: <Mic className="h-4 w-4" />,
  award: <Award className="h-4 w-4" />,
  x: <XCircle className="h-4 w-4" />,
  music: <Music className="h-4 w-4" />,
  briefcase: <Briefcase className="h-4 w-4" />,
  star: <Star className="h-4 w-4" />,
  clock: <Clock className="h-4 w-4" />,
  flame: <Flame className="h-4 w-4" />,
};

function DroppableColumn({
  column,
  config,
  boardId,
  sortedColumns,
  onDialogOpenChange,
  onColumnDeleted,
  open,
  onOpenChange,
  boardScrollRef,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
  sortedColumns: Column[];
  onDialogOpenChange: (open: boolean) => void;
  onColumnDeleted: (columnId: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardScrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [menuAlign, setMenuAlign] = useState<"start" | "end">("end");

  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: {
      type: "column",
      columnId: column._id,
    },
  });

  const sortedJobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || [];

  function updateMenuAlign() {
    const triggerRect = triggerRef.current?.getBoundingClientRect();
    const boardRect = boardScrollRef.current?.getBoundingClientRect();

    if (!triggerRect || !boardRect) return;

    const menuWidth = 160;

    const spaceLeft = triggerRect.left - boardRect.left;
    const spaceRight = boardRect.right - triggerRect.right;

    if (spaceLeft < menuWidth && spaceRight >= menuWidth) {
      setMenuAlign("start");
    } else {
      setMenuAlign("end");
    }
  }

  function handleMenuOpenChange(open: boolean) {
    onOpenChange(open);
  }

  async function handleDelete() {
    try {
      const result = await deleteColumn(column._id);
      if (!result.error) {
        onColumnDeleted(column._id);
      }
    } catch (err) {
      console.error("Failed to delete column ", err);
    }
  }

  return (
    <Card className="min-w-[300px] flex-shrink-0 shadow-md p-0 rounded-b-lg">
      <CardHeader className={`${config.color} text-white pb-3 pt-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>

          <DropdownMenu
            modal={false}
            open={open}
            onOpenChange={handleMenuOpenChange}
          >
            <DropdownMenuTrigger asChild>
              <Button
                ref={triggerRef}
                size="icon"
                onPointerDown={updateMenuAlign}
                className="h-6 w-6 text-white hover:bg-white/20 cursor-pointer"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            {/* const menuWidth = 160; matches className="w-40" */}
            <DropdownMenuContent align={menuAlign} className="w-40">
              <DropdownMenuItem
                className="text-destructive cursor-pointer"
                onClick={() => handleDelete()}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {/* Minimum Column Height */}
      <CardContent
        ref={setNodeRef}
        className={`space-y-2 pt-4 bg-gray-50/50 min-h-[400px] ${isOver ? "ring-2 ring-blue-500" : ""}`}
      >
        <SortableContext
          items={sortedJobs.map((job) => job._id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedJobs.map((job, key) => (
            <SortableJobCard
              key={key}
              job={{ ...job, columnId: job.columnId || column._id }}
              columns={sortedColumns}
              setDialogOpen={onDialogOpenChange}
            />
          ))}
        </SortableContext>

        <CreateJobApplicationDialog
          columnId={column._id}
          boardId={boardId}
          onOpenChange={onDialogOpenChange}
        />
      </CardContent>
    </Card>
  );
}

function SortableJobCard({
  job,
  columns,
  setDialogOpen,
}: {
  job: JobApplication;
  columns: Column[];
  setDialogOpen: (open: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({
    id: job._id,
    data: {
      type: "job",
      job,
    },
  });

  /* transform: CSS.Transform.toString(transform), */
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    /* style={style} */
    <div ref={setNodeRef} style={style}>
      <JobApplicationCard
        job={job}
        columns={columns}
        setDialogOpen={setDialogOpen}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openColumnMenuId, setOpenColumnMenuId] = useState<string | null>(null);

  const { columns, addColumn, moveJob } = useBoard(board);

  //New Column UI Configuration
  const STORAGE_KEY = `kanban-column-ui-config-${board._id}`;
  const [columnUiConfig, setColumnUiConfig] = useState<
    Record<string, { colorKey: string; iconKey: string }>
  >({});

  const boardScrollRef = React.useRef<HTMLDivElement | null>(null);

  //load
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setColumnUiConfig(JSON.parse(saved));
    }
    setLoaded(true);
  }, [STORAGE_KEY]);

  //save
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columnUiConfig));
  }, [STORAGE_KEY, columnUiConfig]);

  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  async function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !board._id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    let draggedJob: JobApplication | null = null;
    let sourceColumn: Column | null = null;
    let sourceIndex = -1;

    for (const column of sortedColumns) {
      const jobs =
        column.jobApplications.sort((a, b) => a.order - b.order) || [];
      const jobIndex = jobs.findIndex((j) => j._id === activeId);
      if (jobIndex !== -1) {
        draggedJob = jobs[jobIndex];
        sourceColumn = column;
        sourceIndex = jobIndex;
        break;
      }
    }

    if (!draggedJob || !sourceColumn) return;

    //Check if dropped in a column or another job
    const targetColumn = sortedColumns.find((col) => col._id === overId);
    const targetJob = sortedColumns
      .flatMap((col) => col.jobApplications || [])
      .find((job) => job._id === overId);

    let targetColumnId: string;
    let newOrder: number;

    if (targetColumn) {
      targetColumnId = targetColumn._id;
      const jobsInTarget =
        targetColumn.jobApplications
          .filter((j) => j._id !== activeId)
          .sort((a, b) => a.order - b.order) || [];
      newOrder = jobsInTarget.length;
    } else if (targetJob) {
      const targetJobColumn = sortedColumns.find((col) =>
        col.jobApplications.some((j) => j._id === targetJob._id),
      );
      targetColumnId = targetJob.columnId || targetJobColumn?._id || "";
      if (!targetColumnId) return;

      const targetColumnObj = sortedColumns.find(
        (col) => col._id === targetColumnId,
      );

      if (!targetColumnObj) return;

      const allJobsInTargetOriginal =
        targetColumnObj.jobApplications.sort((a, b) => a.order - b.order) || [];

      const allJobsInTargetFiltered =
        allJobsInTargetOriginal.filter((j) => j._id != activeId) || [];

      const targetIndexInOriginal = allJobsInTargetOriginal.findIndex(
        (j) => j._id === overId,
      );

      const targetIndexInFiltered = allJobsInTargetFiltered.findIndex(
        (j) => j._id === overId,
      );

      if (targetIndexInFiltered !== -1) {
        if (sourceColumn._id === targetColumnId) {
          if (sourceIndex < targetIndexInOriginal) {
            newOrder = targetIndexInFiltered + 1;
          } else {
            newOrder = targetIndexInFiltered;
          }
        } else {
          newOrder = targetIndexInFiltered;
        }
      } else {
        newOrder = allJobsInTargetFiltered.length;
      }
    } else {
      return;
    }

    if (!targetColumnId) {
      return;
    }

    await moveJob(activeId, targetColumnId, newOrder);
  }

  const activeJob = sortedColumns
    .flatMap((col) => col.jobApplications || [])
    .find((job) => job._id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-100">{board.name}</h1>
          <p className="text-neutral-400">Track your job applications</p>
        </div>

        <div className="flex items-end">
          <CreateColumnDialog
            board={board}
            onColumnCreated={({ column, colorKey, iconKey }) => {
              addColumn(column);

              setColumnUiConfig((prev) => ({
                ...prev,
                [column._id]: { colorKey, iconKey },
              }));
            }}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
        </div>
      </div>

      <div
        ref={boardScrollRef}
        onScroll={() => setOpenColumnMenuId(null)}
        className={`flex gap-4 pb-4 ${
          dialogOpen ? "overflow-x-hidden" : "overflow-x-auto"
        }`}
      >
        {sortedColumns.map((col) => {
          const uiConfig = columnUiConfig[col._id];
          const config = uiConfig
            ? {
                color: COLOR_CONFIG[uiConfig.colorKey] ?? "bg-neutral-500",
                icon: ICON_CONFIG[uiConfig.iconKey] ?? (
                  <Calendar className="h-4 w-4" />
                ),
              }
            : DEFAULT_COLUMN_CONFIG[col.name] || {
                color: "bg-neutral-500",
                icon: <Calendar className="h-4 w-4" />,
              };

          return (
            <DroppableColumn
              key={col._id}
              column={col}
              config={config}
              boardId={board._id}
              sortedColumns={sortedColumns}
              onDialogOpenChange={setDialogOpen}
              onColumnDeleted={(columnId) => {
                setColumnUiConfig((prev) => {
                  const copy = { ...prev };
                  delete copy[columnId];
                  return copy;
                });
              }}
              open={openColumnMenuId === col._id}
              onOpenChange={(open) =>
                setOpenColumnMenuId(open ? col._id : null)
              }
              boardScrollRef={boardScrollRef}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeJob ? (
          <div className="opacity-50">
            <JobApplicationCard
              job={activeJob}
              columns={sortedColumns}
              setDialogOpen={setDialogOpen}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
