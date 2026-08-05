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
import { ElementType, useState } from "react";
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

function formatUploadedAt(createdAt: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(createdAt));
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
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<LandscapeVideo | null>(null);
  const [deletingVideo, setDeletingVideo] = useState<LandscapeVideo | null>(
    null,
  );

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
          {videos.map((video) => (
            <LandscapeVideoCard
              key={video._id}
              video={video}
              onEdit={() => setEditingVideo(video)}
              onDelete={() => setDeletingVideo(video)}
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
        onSaved={onLandscapeVideoAdded}
      />

      <LandscapeVideoDialog
        open={Boolean(editingVideo)}
        onOpenChange={(open) => {
          if (!open) setEditingVideo(null);
        }}
        landscapeVideoBoard={landscapeVideoBoard}
        section={section}
        video={editingVideo}
        onSaved={(_, updatedVideo) => {
          onLandscapeVideoUpdated(updatedVideo._id, updatedVideo);
          setEditingVideo(null);
        }}
      />

      <DeleteLandscapeVideoDialog
        open={Boolean(deletingVideo)}
        onOpenChange={(open) => {
          if (!open) setDeletingVideo(null);
        }}
        video={deletingVideo}
        onDeleted={(videoId) => {
          onLandscapeVideoDeleted(videoId);
          setDeletingVideo(null);
        }}
      />
    </section>
  );
}

function LandscapeSectionHeader({
  icon: Icon,
  title,
  onAddVideo,
}: {
  icon: ElementType;
  title: string;
  onAddVideo: () => void;
}) {
  return (
    <header
      className="
        flex min-w-0 flex-col
        gap-3

        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:gap-4
      "
    >
      <div className="flex min-w-0 items-center gap-3">
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

        <h2
          className="
            min-w-0 break-words
            font-marcellus
            text-2xl leading-tight text-white

            sm:text-3xl
            lg:text-4xl
          "
        >
          {title}
        </h2>
      </div>

      <Button
        type="button"
        variant="outline"
        className="
          group h-10 w-full
          cursor-pointer rounded-xl
          border-amber-400/25
          bg-black/30 px-3
          text-sm font-bold text-amber-200
          transition-all duration-300

          hover:-translate-y-0.5
          hover:bg-amber-400/10 active:transition-none active:bg-amber-400/10
          hover:text-white active:text-white
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
            group-hover:-translate-y-0.5
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
  onEdit,
  onDelete,
  onFeatured,
}: {
  video: LandscapeVideo;
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
        <VideoFrame video={video} />

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
              mt-4 flex min-w-0
              items-start justify-between
              gap-2

              sm:gap-4
            "
          >
            <div className="min-w-0 flex-1">
              <h3
                className="
                  line-clamp-2 break-words
                  font-marcellus
                  text-lg leading-tight text-white
                  transition-colors duration-300
                  group-hover:text-amber-200

                  sm:text-xl
                  lg:line-clamp-1
                  lg:text-2xl
                "
              >
                {video.title}
              </h3>

              <p
                className="
                    mt-2 line-clamp-2
                    break-words
                    text-xs leading-5 text-gray-400

                    sm:mt-3
                    sm:line-clamp-1
                    sm:text-sm
                  "
              >
                {video.duration} • Uploaded {formatUploadedAt(video.createdAt)}
              </p>
            </div>

            <LandscapeVideoMenu
              video={video}
              onEdit={onEdit}
              onDelete={onDelete}
              onFeatured={onFeatured}
            />
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
    <DropdownMenu modal={false}>
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

            hover:-translate-y-0.5
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
        sideOffset={8}
        collisionPadding={12}
        className="
          w-[calc(100vw-2rem)]
          max-w-60
          rounded-2xl
          border border-amber-300/20
          bg-neutral-950/95
          p-1.5
          font-redHatDisplay
          text-gray-100
          shadow-[0_0_24px_rgba(245,158,11,0.28)]
          backdrop-blur-xl

          sm:rounded-3xl
          sm:p-2
        "
      >
        <DropdownMenuItem
          disabled={video.isFeatured || featuring}
          onSelect={handleSetFeatured}
          className="
            group cursor-pointer rounded-xl
            px-3 py-2.5 text-sm font-medium
            focus:bg-amber-400/80
            focus:text-black
            disabled:cursor-default
            sm:rounded-2xl sm:py-3 sm:text-base
          "
        >
          {featuring ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin sm:mr-3 sm:h-5 sm:w-5" />
          ) : (
            <Star
              className={`
                mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5
                ${
                  video.isFeatured
                    ? "fill-amber-300 text-amber-300"
                    : "text-amber-300"
                }
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
            px-3 py-2.5
            text-sm font-medium
            transition-colors duration-200
            focus:bg-amber-400/80 active:bg-amber-400/80
            focus:text-black active:text-black

            sm:rounded-2xl
            sm:py-3
            sm:text-base
          "
        >
          <Edit3
            className="
              mr-2 h-4 w-4 shrink-0
              text-amber-300
              transition-transform duration-300
              group-hover:rotate-6
              group-focus:text-black

              sm:mr-3
              sm:h-5 sm:w-5
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
            px-3 py-2.5
            text-sm font-medium
            text-red-300
            transition-colors duration-200
            focus:bg-red-600/80 active:bg-red-600/80
            focus:text-white active:text-white

            sm:rounded-2xl
            sm:py-3
            sm:text-base
          "
        >
          <Trash2
            className="
              mr-2 h-4 w-4 shrink-0
              transition-transform duration-300
              group-hover:scale-110

              sm:mr-3
              sm:h-5 sm:w-5
            "
          />

          <span className="min-w-0 truncate">Delete Video</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
