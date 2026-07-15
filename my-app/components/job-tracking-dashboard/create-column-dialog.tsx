"use client";

import { createColumn } from "@/lib/actions/columns";
import { Board, Column } from "@/lib/models/models.types";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Mic,
  Music,
  Plus,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface CreateColumnDialogProps {
  board: Board;
  onColumnCreated?: (data: {
    column: Column;
    colorKey: string;
    iconKey: string;
  }) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INITIAL_FORM_DATA = {
  name: "",
  colorKey: "neutral",
  iconKey: "calendar",
};

const COLOUR_OPTIONS = [
  { key: "cyan", className: "bg-cyan-500" },
  { key: "purple", className: "bg-purple-500" },
  { key: "green", className: "bg-green-500" },
  { key: "yellow", className: "bg-yellow-500" },
  { key: "red", className: "bg-red-500" },
  { key: "blue", className: "bg-blue-500" },
  { key: "pink", className: "bg-pink-500" },
  { key: "orange", className: "bg-orange-500" },
  { key: "emerald", className: "bg-emerald-500" },
  { key: "neutral", className: "bg-neutral-500" },
];

const ICON_OPTIONS = [
  { key: "calendar", icon: <Calendar className="h-4 w-4" /> },
  { key: "check", icon: <CheckCircle2 className="h-4 w-4" /> },
  { key: "mic", icon: <Mic className="h-4 w-4" /> },
  { key: "award", icon: <Award className="h-4 w-4" /> },
  { key: "x", icon: <XCircle className="h-4 w-4" /> },
  { key: "music", icon: <Music className="h-4 w-4" /> },
  { key: "briefcase", icon: <Briefcase className="h-4 w-4" /> },
  { key: "star", icon: <Star className="h-4 w-4" /> },
  { key: "clock", icon: <Clock className="h-4 w-4" /> },
  { key: "flame", icon: <Flame className="h-4 w-4" /> },
];

export default function CreateColumnDialog({
  board,
  open,
  onOpenChange,
  onColumnCreated,
}: CreateColumnDialogProps) {
  //const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      const result = await createColumn({
        name: formData.name,
        boardId: board._id,
      });

      if (!result.error && result.data) {
        onColumnCreated?.({
          column: result.data,
          colorKey: formData.colorKey,
          iconKey: formData.iconKey,
        });

        setFormData(INITIAL_FORM_DATA);
        onOpenChange(false);
      } else {
        console.error("Failed to create column: ", result.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-neutral-700 text-neutral-200 text-md hover:bg-neutral-600 cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Column
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="items-center">
          <DialogTitle>Add a new column</DialogTitle>
          {/* <DialogDescription>Track a new column</DialogDescription> */}
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2 ">
            {/* <Label htmlFor="columnName">Column Name</Label> */}
            <Input
              id="columnName"
              placeholder="Column Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <div className="space-y-2">
              <p className="text-sm font-medium">Column Color</p>
              <div className="grid grid-cols-5 gap-2">
                {COLOUR_OPTIONS.map((color) => (
                  <Button
                    key={color.key}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, colorKey: color.key })
                    }
                    className={`h-9 rounded-md border-2 
                                 transition-all duration-100
                                 cursor-pointer
                                 ${color.className} 
                                 ${
                                   formData.colorKey === color.key
                                     ? "border-black scale-105 ring-2 ring-black/20"
                                     : "border-transparent"
                                 }`}
                  ></Button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Column Icon</p>
            <div className="grid grid-cols-5 gap-2">
              {ICON_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, iconKey: option.key })
                  }
                  className={`
                              flex h-10 items-center justify-center rounded-md border
                              transition-all duration-100
                              cursor-pointer
                              ${
                                formData.iconKey === option.key
                                  ? "border-black bg-neutral-200"
                                  : "border-neutral-200 bg-white hover:bg-neutral-100"
                              }
                            `}
                >
                  {option.icon}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="hover:text-destructive cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-600 cursor-pointer"
            >
              Add Column
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
