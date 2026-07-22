import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit3, EllipsisVertical, Trash2, Upload } from "lucide-react";
import { ElementType } from "react";
import { FaYoutube } from "react-icons/fa";
import type {
  LandscapeVideo,
  LandscapeVideoSectionData,
} from "./landscape-video-types";
import { VideoFrame } from "./video-frame";

type LandscapeVideoSectionProps = {
  section: LandscapeVideoSectionData;
};

export function LandscapeVideoSection({ section }: LandscapeVideoSectionProps) {
  return (
    <section
      id={section.id}
      className="
        min-w-0
        scroll-mt-28 space-y-4
        rounded-2xl
        border border-gray-300/15
        bg-neutral-900/50
        p-3

        sm:scroll-mt-32
        sm:space-y-5
        sm:rounded-3xl
        sm:p-5
      "
    >
      <LandscapeSectionHeader icon={section.icon} title={section.label} />

      {section.videos.length === 0 ? (
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
          {section.videos.map((video) => (
            <LandscapeVideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}

function LandscapeSectionHeader({
  icon: Icon,
  title,
}: {
  icon: ElementType;
  title: string;
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

function LandscapeVideoCard({ video }: { video: LandscapeVideo }) {
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

              {video.duration && video.uploadedAt && (
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
                  {video.duration} • Uploaded {video.uploadedAt}
                </p>
              )}
            </div>

            <LandscapeVideoMenu video={video} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LandscapeVideoMenu({ video }: { video: LandscapeVideo }) {
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
          className="
            group cursor-pointer
            rounded-xl
            px-3 py-2.5
            text-sm font-medium
            transition-colors duration-200
            focus:bg-amber-400/80
            focus:text-black

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
          className="
            group cursor-pointer
            rounded-xl
            px-3 py-2.5
            text-sm font-medium
            text-red-300
            transition-colors duration-200
            focus:bg-red-600/80
            focus:text-white

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
