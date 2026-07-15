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
      className="mx-8 scroll-mt-32 space-y-5 rounded-3xl border border-gray-300/15 bg-neutral-900/50 p-5"
    >
      <LandscapeSectionHeader icon={section.icon} title={section.label} />

      {section.videos.length === 0 ? (
        <Card className="rounded-3xl border-white/10 bg-black/30">
          <CardContent className="p-8 text-center text-gray-400">
            No videos in this section yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
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
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 shadow-[0_0_12px_rgba(245,158,11,0.16)]">
          <Icon className="h-6 w-6 text-amber-300" />
        </div>

        <h2 className="font-marcellus text-4xl text-white">{title}</h2>
      </div>

      <Button
        type="button"
        variant="outline"
        className="group h-12 cursor-pointer rounded-2xl border-amber-400/25 bg-black/30 px-5 text-lg font-bold text-amber-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400/10 hover:text-white hover:shadow-[0_0_16px_rgba(245,158,11,0.28)]"
      >
        <Upload className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
        Add Video
      </Button>
    </header>
  );
}

function LandscapeVideoCard({ video }: { video: LandscapeVideo }) {
  return (
    <Card className="group rounded-3xl border border-gray-300/15 bg-neutral-800/70 p-3 transition-all duration-300 hover:border-amber-300/30 hover:shadow-[0_0_18px_rgba(245,158,11,0.18)]">
      <CardContent className="relative overflow-hidden rounded-[1.35rem] border border-gray-300/10 bg-neutral-900 p-0">
        <VideoFrame video={video} />

        <div className="relative min-h-32 p-4">
          <div className="absolute -top-5 left-24 rounded-xl border border-gray-300/15 bg-neutral-800 px-3 py-2 shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
            <FaYoutube className="h-5 w-5 text-red-500" />
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="line-clamp-1 font-marcellus text-2xl leading-tight text-white transition-colors duration-300 group-hover:text-amber-200">
                {video.title}
              </h3>

              {video.duration && video.uploadedAt && (
                <p className="mt-3 line-clamp-1 text-sm text-gray-400">
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
          className="shrink-0 cursor-pointer rounded-full border-none bg-black/40 text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400/80 hover:text-black hover:shadow-[0_0_18px_rgba(245,158,11,0.45)] data-[state=open]:bg-amber-400/80 data-[state=open]:text-black data-[state=open]:shadow-[0_0_18px_rgba(245,158,11,0.45)]"
        >
          <EllipsisVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-60 rounded-3xl border border-amber-300/20 bg-neutral-950/95 p-2 font-redHatDisplay text-gray-100 shadow-[0_0_24px_rgba(245,158,11,0.28)] backdrop-blur-xl"
      >
        <DropdownMenuItem className="group cursor-pointer rounded-2xl px-3 py-3 text-base font-medium transition-colors duration-200 focus:bg-amber-400/80 focus:text-black">
          <Edit3 className="mr-3 h-5 w-5 text-amber-300 transition-transform duration-300 group-hover:rotate-6 group-focus:text-black" />
          Edit Video Details
        </DropdownMenuItem>

        <div className="my-1 h-px bg-white/10" />

        <DropdownMenuItem className="group cursor-pointer rounded-2xl px-3 py-3 text-base font-medium text-red-300 transition-colors duration-200 focus:bg-red-600/80 focus:text-white">
          <Trash2 className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          Delete Video
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
