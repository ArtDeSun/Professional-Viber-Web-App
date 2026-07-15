import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { LandscapeVideo } from "./landscape-video-types";

type VideoFrameProps = {
  video: LandscapeVideo;
  featured?: boolean;
};

export function VideoFrame({ video, featured = false }: VideoFrameProps) {
  return (
    <div
      className={`relative aspect-video overflow-hidden bg-black ${
        featured ? "rounded-2xl" : "rounded-t-2xl"
      }`}
    >
      {video.sourceType === "youtube" && video.youtubeEmbedUrl ? (
        <iframe
          src={video.youtubeEmbedUrl}
          title={video.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      ) : video.thumbnailUrl ? (
        <Button
          type="button"
          className="relative h-full w-full cursor-pointer overflow-hidden rounded-none p-0"
        >
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Button>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          No video preview available
        </div>
      )}
    </div>
  );
}
