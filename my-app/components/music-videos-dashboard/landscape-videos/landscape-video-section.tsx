"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit3,
  EllipsisVertical,
  Loader2,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { ElementType, useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { VideoFrame } from "./video-frame";

import { setFeaturedLandscapeVideo } from "@/lib/actions/landscape-videos";
import type {
  LandscapeVideo,
  LandscapeVideoBoard,
  LandscapeVideoSection,
} from "@/lib/models/models.types";
import DeleteLandscapeVideoDialog from "./delete-landscape-video-dialog";
import LandscapeVideoDialog from "./landscape-video-dialog";

/* function formatUploadedAt(createdAt: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(createdAt));
} */

function formatTimeAgo(value: Date, now: number): string {
  const seconds = Math.max(
    0,
    Math.floor((now - new Date(value).getTime()) / 1000),
  );

  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  return `${Math.floor(days / 365)}y ago`;
}

type LandscapeVideoSectionProps = {
  section: LandscapeVideoSection;
  landscapeVideoBoard: LandscapeVideoBoard;
  icon: ElementType;
  onLandscapeVideoAdded: (sectionId: string, video: LandscapeVideo) => void;
  onLandscapeVideoUpdated: (videoId: string, video: LandscapeVideo) => void;
  onLandscapeVideoDeleted: (videoId: string) => void;
  onLandscapeVideoFeatured: (videoId: string, video: LandscapeVideo) => void;
};

export function DashboardLandscapeVideoSection({
  section,
  landscapeVideoBoard,
  icon,
  onLandscapeVideoAdded,
  onLandscapeVideoUpdated,
  onLandscapeVideoDeleted,
  onLandscapeVideoFeatured,
}: LandscapeVideoSectionProps) {
  const [now, setNow] = useState<number | null>(null);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<LandscapeVideo | null>(null);
  const [deletingVideo, setDeletingVideo] = useState<LandscapeVideo | null>(
    null,
  );
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setNow(Date.now());

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const videos = [...(section.landscapeVideos ?? [])].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <section
      id={section._id}
      className="
        min-w-0
        scroll-mt-36 space-y-4
        rounded-2xl
        border border-gray-300/15
        bg-neutral-900/50
        p-3

        sm:scroll-mt-40
        sm:space-y-5
        sm:rounded-3xl
        sm:p-5
      "
    >
      <LandscapeSectionHeader
        icon={icon}
        title={section.label}
        videoCount={videos.length}
        onAddVideo={() => setAddDialogOpen(true)}
      />

      {videos.length === 0 ? (
        <Card className="rounded-2xl border-white/10 bg-black/30 sm:rounded-3xl">
          <CardContent
            className="
              p-5 text-center
              text-sm leading-6 text-gray-400
              sm:p-8 sm:text-base
            "
          >
            No videos in this section yet.
          </CardContent>
        </Card>
      ) : (
        <div
          className="
            grid min-w-0
            grid-cols-1 gap-4
            md:grid-cols-2
            xl:grid-cols-3
            xl:gap-5
          "
        >
          {videos.map((video, index) => (
            <LandscapeVideoCard
              key={video._id}
              video={video}
              now={now}
              eager={false}
              onEdit={() => {
                setEditingVideo(video);
                setEditDialogOpen(true);
              }}
              onDelete={() => {
                setDeletingVideo(video);
                setDeleteDialogOpen(true);
              }}
              onFeatured={onLandscapeVideoFeatured}
            />
          ))}
        </div>
      )}
      <LandscapeVideoDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        landscapeVideoBoard={landscapeVideoBoard}
        section={section}
        icon={icon}
        onSaved={(sectionId, video) => {
          setAddDialogOpen(false);
          window.setTimeout(() => {
            onLandscapeVideoAdded(sectionId, video);
          }, 200);
        }}
      />

      <LandscapeVideoDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        landscapeVideoBoard={landscapeVideoBoard}
        section={section}
        icon={icon}
        video={editingVideo}
        onSaved={(_, updatedVideo) => {
          setEditDialogOpen(false);
          window.setTimeout(() => {
            onLandscapeVideoUpdated(updatedVideo._id, updatedVideo);
          }, 200);
        }}
      />

      <DeleteLandscapeVideoDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        video={deletingVideo}
        sectionLabel={section.label}
        onDeleted={(videoId) => {
          setDeleteDialogOpen(false);
          window.setTimeout(() => {
            onLandscapeVideoDeleted(videoId);
          }, 200);
        }}
      />
    </section>
  );
}

function LandscapeSectionHeader({
  icon: Icon,
  title,
  videoCount,
  onAddVideo,
}: {
  icon: ElementType;
  title: string;
  videoCount: number;
  onAddVideo: () => void;
}) {
  return (
    <header
      className="
                  sticky top-18 z-20
                  -mx-1 flex min-w-0
                  flex-col gap-4
                  rounded-xl border border-white/10
                  px-3 py-2.5
                  
                  bg-gradient-to-b
                  from-black via-black/80 via-80% to-transparent
                  backdrop-blur-md

                  sm:top-19 lg:top-23
                  sm:flex-row sm:items-center
                  sm:justify-between sm:gap-5
                  sm:px-4 sm:py-3
                "
    >
      <div className="flex min-w-0 items-center gap-3 justify-end sm:justify-start">
        <div
          className="
            shrink-0 rounded-xl
            border border-white/10
            bg-white/10 p-2.5
            shadow-[0_0_12px_rgba(245,158,11,0.16)]

            sm:rounded-2xl
            sm:p-3
          "
        >
          <Icon className="h-5 w-5 text-amber-300 sm:h-6 sm:w-6" />
        </div>

        <div className="flex min-w-0 items-center gap-2.5">
          <h2
            className="
                        min-w-0 break-words
                        font-marcellus text-2xl
                        leading-tight text-white
                        sm:text-3xl lg:text-4xl
                      "
          >
            {title}
          </h2>

          <span
            className="
                        shrink-0 rounded-md
                        border border-white/15
                        bg-white/5 px-2 py-0.5
                        text-sm font-semibold text-gray-300
                      "
          >
            {videoCount}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onAddVideo}
        className="
          group h-10 w-full
          cursor-pointer rounded-xl
          border-amber-400/25
          bg-black/30 px-3
          text-sm font-bold text-amber-200
          transition-all duration-300

          hover:bg-amber-400/10 active:transition-none active:bg-amber-400/10
          hover:text-amber-400 active:text-amber-400
          hover:shadow-[0_0_16px_rgba(245,158,11,0.28)]

          sm:h-11
          sm:w-fit
          sm:rounded-2xl
          sm:px-4
          sm:text-base

          lg:h-12
          lg:px-5
          lg:text-lg
        "
      >
        <Upload
          className="
            mr-2 h-4 w-4
            shrink-0
            transition-transform duration-300
            group-hover:scale-110

            sm:h-5 sm:w-5
          "
        />

        <span className="truncate">Add Video</span>
      </Button>
    </header>
  );
}

function LandscapeVideoCard({
  video,
  now,
  eager,
  onEdit,
  onDelete,
  onFeatured,
}: {
  video: LandscapeVideo;
  now: number | null;
  eager: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onFeatured: (videoId: string, video: LandscapeVideo) => void;
}) {
  return (
    <Card
      className="
        group min-w-0
        rounded-2xl
        border border-gray-300/15
        bg-neutral-800/70
        p-1.5
        transition-all duration-300

        hover:border-amber-300/30
        hover:shadow-[0_0_18px_rgba(245,158,11,0.18)]

        sm:rounded-3xl
        sm:p-3
      "
    >
      <CardContent
        className="
          relative min-w-0
          overflow-hidden
          rounded-[1rem]
          border border-gray-300/10
          bg-neutral-900 p-0

          sm:rounded-[1.35rem]
        "
      >
        <VideoFrame video={video} eager={eager} />

        <div
          className=" 
            relative min-w-0
            min-h-28 p-3

            sm:min-h-32
            sm:p-4
          "
        >
          {video.fromYoutube && (
            <div
              className="
              absolute
              -top-4 left-3
              rounded-lg
              border border-gray-300/15
              bg-neutral-800
              px-2 py-1.5
              shadow-[0_6px_18px_rgba(0,0,0,0.45)]

              sm:-top-5
              sm:left-6
              sm:rounded-xl
              sm:px-3
              sm:py-2

              lg:left-24
            "
            >
              <FaYoutube className="h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
            </div>
          )}

          <div
            className="
              mt-1 flex min-w-0
              items-start justify-between
              gap-2

              sm:gap-4
            "
          >
            <div className="min-w-0 flex-1 mt-4">
              <h3
                className="
                  leading-snug
                  line-clamp-2 break-words
                  font-marcellus
                  text-lg leading-tight text-white
                  transition-colors duration-300
                  group-hover:text-amber-200

                  sm:text-2xl
                  lg:line-clamp-1
                  lg:text-[1.8rem]
                "
              >
                {video.title}
              </h3>

              <div className="mt-3">
                <span
                  className="
                              shrink-0 rounded-2xl
                              border border-white/15
                              bg-white/5 px-1.5 py-1.5
                              text-lg font-bold text-gray-200
                            "
                >
                  {video.duration}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end">
              <LandscapeVideoMenu
                video={video}
                onEdit={onEdit}
                onDelete={onDelete}
                onFeatured={onFeatured}
              />
              <div className="mt-2 space-y-1.5 text-right">
                <div>
                  <div className="text-[9px] uppercase text-gray-400">
                    Uploaded
                  </div>

                  <div className="text-base font-semibold text-gray-200">
                    {now ? formatTimeAgo(video.createdAt, now) : "—"}
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-[9px] uppercase text-gray-400">
                    Updated
                  </div>

                  <div className="text-base font-semibold text-gray-200">
                    {now ? formatTimeAgo(video.updatedAt, now) : "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LandscapeVideoMenu({
  video,
  onEdit,
  onDelete,
  onFeatured,
}: {
  video: LandscapeVideo;
  onEdit: () => void;
  onDelete: () => void;
  onFeatured: (videoId: string, video: LandscapeVideo) => void;
}) {
  const [featuring, setFeaturing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function handleScroll() {
      setMenuOpen(false);
    }

    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [menuOpen]);

  async function handleSetFeatured() {
    if (video.isFeatured || featuring) return;

    setFeaturing(true);

    try {
      const result = await setFeaturedLandscapeVideo(video._id);

      if (result.error || !result.data) {
        console.error(result.error ?? "Failed to feature video");
        return;
      }

      onFeatured(video._id, result.data);
    } finally {
      setFeaturing(false);
    }
  }
  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon"
          aria-label={`Open options for ${video.title}`}
          className="
            h-9 w-9 shrink-0
            cursor-pointer rounded-full
            border-none bg-black/40
            text-gray-200
            transition-all duration-300

            hover:bg-amber-400/80 active:transition-none active:bg-amber-400/80
            hover:text-black active:text-black
            hover:shadow-[0_0_18px_rgba(245,158,11,0.45)]

            data-[state=open]:bg-amber-400/80
            data-[state=open]:text-black
            data-[state=open]:shadow-[0_0_18px_rgba(245,158,11,0.45)]

            sm:h-10 sm:w-10
          "
        >
          <EllipsisVertical className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        collisionPadding={8}
        className="
          w-auto min-w-44 max-w-48
          rounded-xl
          border border-amber-300/20
          bg-neutral-950/95
          p-1
          font-redHatDisplay
          text-gray-100
          shadow-[0_0_24px_rgba(245,158,11,0.28)]
          backdrop-blur-xl

          sm:min-w-48 sm:max-w-52
          sm:rounded-2xl
          sm:p-1.5
        "
      >
        <DropdownMenuItem
          disabled={video.isFeatured || featuring}
          onSelect={handleSetFeatured}
          className="
            group cursor-pointer rounded-xl
            px-2.5 py-2 text-xs font-bold
            focus:bg-amber-400/80
            focus:text-black
            disabled:cursor-default
            sm:rounded-2xl sm:px-3 sm:py-2.5 sm:text-sm
          "
        >
          {featuring ? (
            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin sm:mr-3 sm:h-4 sm:w-4" />
          ) : (
            <Star
              className={`
                mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5
                text-amber-300
              `}
            />
          )}

          <span className="truncate">
            {video.isFeatured ? "Featured Video" : "Set as Featured"}
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={onEdit}
          className="
            group cursor-pointer
            rounded-xl
            px-2.5 py-2
            text-xs font-bold
            transition-colors duration-200
            focus:bg-amber-400/80 active:bg-amber-400/80
            focus:text-black active:text-black

            sm:rounded-xl
            sm:py-3 sm:py-2.5
            sm:text-sm
          "
        >
          <Edit3
            className="
              mr-2 h-3.5 w-3.5 shrink-0
              text-amber-300
              transition-transform duration-300
              group-hover:rotate-6
              group-focus:text-black

              sm:mr-3
              sm:h-4 sm:w-4
            "
          />

          <span className="min-w-0 truncate">Edit Video Details</span>
        </DropdownMenuItem>

        <div className="my-1 h-px bg-white/10" />

        <DropdownMenuItem
          onSelect={onDelete}
          className="
            group cursor-pointer
            rounded-xl
            px-2.5 py-2
            text-xs font-bold
            text-red-300
            transition-colors duration-200
            focus:bg-red-500/80 active:bg-red-500/80
            focus:text-white active:text-white

            sm:rounded-xl
            sm:py-3 sm:py-2.5
            sm:text-sm
          "
        >
          <Trash2
            className="
              mr-2 h-3.5 w-3.5 shrink-0
              transition-transform duration-300
              group-hover:scale-110

              sm:mr-3
              sm:h-4 sm:w-4
            "
          />

          <span className="min-w-0 truncate">Delete Video</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
