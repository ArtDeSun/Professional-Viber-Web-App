import { Button } from "@/components/ui/button";
import type { LandscapeVideo } from "@/lib/models/models.types";
import { ChevronLeft, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

type VideoFrameProps = {
  video: LandscapeVideo;
  featured?: boolean;
  eager?: boolean;
};

export function VideoFrame({
  video,
  featured = false,
  eager = false,
}: VideoFrameProps) {
  type ThumbnailPhase = "hydrating" | "loading" | "loaded";

  const [phase, setPhase] = useState<ThumbnailPhase>("hydrating");
  const [showPlayer, setShowPlayer] = useState(false);
  const [thumbnailProgress, setThumbnailProgress] = useState(10);

  const progressLabel =
    phase === "hydrating" ? "Initializing" : "Loading thumbnail";

  const previewImage =
    video.thumbnailUrl ??
    (video.fromYoutube
      ? getYouTubeThumbnail(video.youtubeUrl ?? video.youtubeEmbedUrl ?? "")
      : null);

  const imageSizes = featured
    ? "(max-width: 639px) calc(100vw - 2rem), 50vw"
    : `
      (max-width: 639px) 42vw,
      (max-width: 767px) calc(100vw - 2rem),
      (max-width: 1279px) calc(50vw - 3rem),
      calc(33vw - 3rem)
    `;

  useEffect(() => {
    setPhase("loading");
    setShowPlayer(false);
    setThumbnailProgress(25);

    const interval = window.setInterval(() => {
      setThumbnailProgress((current) => {
        if (current >= 85) return current;

        return Math.min(85, current + Math.max(1, (85 - current) * 0.08));
      });
    }, 200);

    return () => window.clearInterval(interval);
  }, [video._id, previewImage]);

  return (
    <div
      className={`
                  relative
                  min-h-0 w-full min-w-0
                  overflow-hidden

                  sm:rounded-2xl

                  ${showPlayer && !featured ? "h-auto" : "aspect-video h-auto"}
                `}
    >
      {video.fromYoutube && video.youtubeEmbedUrl && showPlayer ? (
        <div className="w-full">
          <div className="relative aspect-video w-full">
            <iframe
              src={getPrivacyEnhancedEmbedUrl(video.youtubeEmbedUrl)}
              title={video.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 block h-full w-full border-0"
            />
          </div>

          {!featured && (
            <div className="flex justify-between bg-neutral-900 px-2 py-1.5">
              {/* Left: collapse up */}
              <button
                type="button"
                onClick={() => setShowPlayer(false)}
                aria-label="Collapse video up"
                className="
                            flex h-6 w-6
                            cursor-pointer
                            items-center justify-center
                            rounded-full
                            bg-white/10
                            text-gray-300
                            transition-colors duration-200

                            hover:bg-neutral-400
                            hover:text-black

                            active:bg-neutral-400
                            active:text-black
                            active:transition-none
                          "
              >
                <ChevronUp className="h-4 w-4" />
              </button>

              {/* Right: collapse left */}
              <button
                type="button"
                onClick={() => setShowPlayer(false)}
                aria-label="Collapse video left"
                className="
                  flex h-6 w-6
                  cursor-pointer
                  items-center justify-center
                  rounded-full
                  bg-white/10
                  text-gray-300
                  transition-colors duration-200

                  hover:bg-neutral-400
                  hover:text-black

                  active:bg-neutral-400
                  active:text-black
                  active:transition-none
                "
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : previewImage && video.fromYoutube && video.youtubeEmbedUrl ? (
        <Button
          type="button"
          aria-label={`Play ${video.title}`}
          onClick={() => setShowPlayer(true)}
          className="
            group relative block h-full w-full
            min-w-0 cursor-pointer
            overflow-hidden rounded-none p-0
            border-0 bg-transparent shadow-none
            hover:bg-transparent
          "
        >
          <Image
            src={previewImage}
            alt={video.title}
            fill
            //either this:
            loading={eager ? "eager" : "lazy"}
            //fetchPriority={eager ? "high" : "auto"}
            //or this:
            //preload={eager}
            quality={65}
            onLoad={() => {
              setThumbnailProgress(100);
              setPhase("loaded");
            }}
            onError={() => {
              setThumbnailProgress(100);
              setPhase("loaded");
            }}
            className={`
              scale-[1.005] object-cover
              transition-[opacity] duration-500
              ${thumbnailProgress === 100 ? "opacity-100" : "opacity-0"}
            `}
            sizes={imageSizes}
          />

          <span className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/35" />

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
              className={`
                          absolute left-1/2 top-1/2
                          flex -translate-x-1/2 -translate-y-1/2
                          items-center justify-center
                          bg-red-600/50
                          shadow-[0_0_18px_rgba(239,68,68,0.45)]
                          transition-[scale,background-color] duration-300
                          group-hover:bg-red-500

                          ${
                            featured
                              ? "h-10 w-14 rounded-2xl sm:h-14 sm:w-20"
                              : "h-7 w-10 rounded-xl sm:h-12 sm:w-18 sm:rounded-2xl"
                          }
                        `}
            >
              <FaYoutube
                className={
                  featured
                    ? "h-6 w-6 text-white sm:h-8 sm:w-8"
                    : "h-4 w-4 text-white sm:h-7 sm:w-7"
                }
              />
            </span>
          )}
        </Button>
      ) : previewImage ? (
        <div className="relative h-full w-full min-w-0">
          <Image
            src={previewImage}
            alt={video.title}
            fill
            //either this:
            loading={eager ? "eager" : "lazy"}
            //fetchPriority={eager ? "high" : "auto"}
            //or this:
            //preload={eager}
            quality={65}
            className="scale-[1.005] object-cover"
            sizes={imageSizes}
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
  const embedUrl = new URL(
    url.replace(
      "https://www.youtube.com/embed/",
      "https://www.youtube-nocookie.com/embed/",
    ),
  );

  embedUrl.searchParams.set("autoplay", "1");
  embedUrl.searchParams.set("playsinline", "1");

  return embedUrl.toString();
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
