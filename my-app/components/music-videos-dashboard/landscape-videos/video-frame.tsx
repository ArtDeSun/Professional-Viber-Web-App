import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import type { LandscapeVideo } from "./landscape-video-types";

type VideoFrameProps = {
  video: LandscapeVideo;
  featured?: boolean;
  resetSignal?: number;
  eager?: boolean;
};

export function VideoFrame({
  video,
  featured = false,
  resetSignal = 0,
  eager = false,
}: VideoFrameProps) {
  type ThumbnailPhase = "hydrating" | "loading" | "loaded";
  const [phase, setPhase] = useState<ThumbnailPhase>("hydrating");
  const progressLabel =
    phase === "hydrating" ? "Initializing" : "Loading thumbnail";
  const [showPlayer, setShowPlayer] = useState(false);
  const [thumbnailProgress, setThumbnailProgress] = useState(10);

  const youtubeThumbnail =
    video.sourceType === "youtube"
      ? getYouTubeThumbnail(video.youtubeUrl ?? video.youtubeEmbedUrl ?? "")
      : null;

  const previewImage =
    video.sourceType === "youtube"
      ? (youtubeThumbnail ?? video.thumbnailUrl)
      : video.thumbnailUrl;

  useEffect(() => {
    setPhase("loading");
    setShowPlayer(false);
    setThumbnailProgress(25);

    const interval = setInterval(() => {
      //setThumbnailProgress((current) => Math.min(current + 5, 85));
      setThumbnailProgress((current) => {
        if (current >= 85) return current;
        return current + Math.max(1, (85 - current) * 0.08);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [video.id, resetSignal, previewImage]);

  return (
    <div
      className={`
        relative min-w-0 aspect-video w-full
        overflow-hidden bg-black

        ${
          featured
            ? "rounded-xl sm:rounded-2xl"
            : "rounded-t-xl sm:rounded-t-2xl"
        }
      `}
    >
      {video.sourceType === "youtube" && video.youtubeEmbedUrl && showPlayer ? (
        <iframe
          src={getPrivacyEnhancedEmbedUrl(video.youtubeEmbedUrl)}
          title={video.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 block h-full w-full border-0"
        />
      ) : previewImage &&
        video.sourceType === "youtube" &&
        video.youtubeEmbedUrl ? (
        <Button
          type="button"
          aria-label={`Play ${video.title}`}
          onClick={() => setShowPlayer(true)}
          className="
            group relative block h-full w-full
            min-w-0 cursor-pointer
            overflow-hidden rounded-none p-0
          "
        >
          <Image
            src={previewImage}
            alt={video.title}
            fill
            //either this:
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            //or this:
            //preload={eager}
            onLoad={() => {
              setThumbnailProgress(90);
              requestAnimationFrame(() => {
                setThumbnailProgress(100);
                setPhase("loaded");
              });
            }}
            className={`
              object-cover
              transition-transform duration-500
              group-hover:scale-[1.02]
              ${thumbnailProgress === 100 ? "opacity-100" : "opacity-0"}
            "
            sizes="
              (max-width: 639px) calc(100vw - 6rem),
              (max-width: 1023px) calc(100vw - 8rem),
              50vw
            "`}
          />

          <span className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/25" />

          {phase !== "loaded" ? (
            <span className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2">
              <span className="mb-1 block text-xs text-white">
                {progressLabel}... {Math.round(thumbnailProgress)}%
              </span>
              <span className="block h-1.5 overflow-hidden rounded-full bg-white/30">
                <span
                  className="block h-full bg-white transition-[width] duration-200"
                  style={{
                    width: `${thumbnailProgress}%`,
                  }}
                />
              </span>
            </span>
          ) : (
            <span
              className="absolute left-1/2 top-1/2
                  flex h-11 w-16
                  -translate-x-1/2 -translate-y-1/2
                  items-center justify-center
                  rounded-2xl bg-red-600/90
                  shadow-[0_0_18px_rgba(239,68,68,0.45)]
                  transition-[scale,background-color] duration-300
                  group-hover:scale-105
                  group-hover:bg-red-500
                  sm:h-12 sm:w-18"
            >
              <FaYoutube className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </span>
          )}
        </Button>
      ) : previewImage ? (
        <div className="relative h-full w-full min-w-0 overflow-hidden">
          <Image
            src={previewImage}
            alt={video.title}
            fill
            //either this:
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            //or this:
            //preload={eager}
            className="object-cover"
            sizes="
              (max-width: 639px) calc(100vw - 6rem),
              (max-width: 1023px) calc(100vw - 8rem),
              50vw
            "
          />
        </div>
      ) : (
        <div
          className="
            flex h-full w-full items-center
            justify-center px-4 text-center
            text-xs leading-5 text-gray-500
            sm:text-sm
          "
        >
          No video preview available
        </div>
      )}
    </div>
  );
}

function getPrivacyEnhancedEmbedUrl(url: string) {
  return url.replace(
    "https://www.youtube.com/embed/",
    "https://www.youtube-nocookie.com/embed/",
  );
}

function getYouTubeThumbnail(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace("www.", "");

    let videoId = "";

    if (hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1).split("/")[0] ?? "";
    } else if (parsedUrl.pathname.startsWith("/shorts/")) {
      videoId = parsedUrl.pathname.split("/shorts/")[1]?.split("/")[0] ?? "";
    } else if (parsedUrl.pathname.startsWith("/embed/")) {
      videoId = parsedUrl.pathname.split("/embed/")[1]?.split("/")[0] ?? "";
    } else {
      videoId = parsedUrl.searchParams.get("v") ?? "";
    }

    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}
