import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3, ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import type { LandscapeVideo } from "./landscape-video-types";
import { VideoFrame } from "./video-frame";

type FeaturedLandscapeVideoProps = {
  video: LandscapeVideo | null;
};

export function FeaturedLandscapeVideo({ video }: FeaturedLandscapeVideoProps) {
  return (
    <section
      id="featured"
      className="
        min-w-0 scroll-mt-28 space-y-4
        sm:scroll-mt-32 sm:space-y-5
      "
    >
      <FeaturedHeader />

      {!video ? (
        <Card
          className="
            min-w-0 rounded-2xl
            border-amber-400/15
            bg-neutral-900/90
            shadow-[0_0_18px_rgba(245,158,11,0.25)]
            sm:rounded-3xl
          "
        >
          <CardContent
            className="
              break-words p-5 text-center
              text-sm leading-6 text-gray-400
              sm:p-8 sm:text-base
            "
          >
            No featured video selected yet.
          </CardContent>
        </Card>
      ) : (
        <Card
          className="
            min-w-0 overflow-hidden
            rounded-2xl
            border-amber-400/15
            bg-neutral-900/90 p-1.5
            shadow-[0_0_18px_rgba(245,158,11,0.5)]
            sm:rounded-3xl sm:p-3
          "
        >
          <CardContent
            className="
              grid min-w-0 gap-4
              rounded-xl border border-white/10
              bg-neutral-950 p-3
              sm:gap-6 sm:rounded-2xl sm:p-4
              lg:grid-cols-[1.1fr_0.9fr]
            "
          >
            <div className="min-w-0">
              <VideoFrame video={video} featured />
            </div>

            <div
              className="
                flex min-w-0 flex-col justify-between
                gap-5 p-1
                sm:p-2
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    mb-2 flex min-w-0 items-center
                    gap-2 text-xs text-gray-400
                    sm:mb-3 sm:text-sm
                  "
                >
                  <FaYoutube className="h-4 w-4 shrink-0 text-red-500 sm:h-5 sm:w-5" />

                  <span className="truncate">Featured upload</span>
                </p>

                <h3
                  className="
                    break-words font-marcellus
                    text-xl leading-tight text-white
                    sm:text-2xl
                    lg:text-3xl
                  "
                >
                  {video.title}
                </h3>

                {video.duration && video.uploadedAt && (
                  <p
                    className="
                      mt-3 break-words
                      text-xs leading-5 text-gray-400
                      sm:mt-4 sm:text-sm
                    "
                  >
                    {video.duration} • Uploaded {video.uploadedAt}
                  </p>
                )}
              </div>

              <div
                className="
                  flex min-w-0 flex-col gap-3
                  sm:flex-row sm:flex-wrap sm:items-center sm:gap-4
                "
              >
                <Button
                  asChild
                  className="
                    group h-10 w-full min-w-0
                    cursor-pointer rounded-xl
                    bg-red-600/80 px-3
                    text-sm font-bold text-white
                    shadow-[0_0_16px_rgba(239,68,68,0.35)]
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-red-500/80 active:transition-none active:bg-red-500/80
                    hover:shadow-[0_0_24px_rgba(239,68,68,0.6)]
                    sm:h-12 sm:w-fit sm:rounded-2xl
                    sm:px-5 sm:text-base
                    lg:text-lg
                  "
                >
                  <Link
                    href={video.youtubeUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0"
                  >
                    <FaYoutube
                      className="
                        mr-2 h-4 w-4 shrink-0
                        transition-transform duration-300
                        group-hover:scale-125
                        sm:h-5 sm:w-5
                      "
                    />

                    <span className="truncate">Open YouTube</span>

                    <ExternalLink
                      className="
                        ml-2 h-3.5 w-3.5 shrink-0
                        transition-transform duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        sm:h-4 sm:w-4
                      "
                    />
                  </Link>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="
                    group h-10 w-full min-w-0
                    cursor-pointer rounded-xl
                    border-amber-400/35
                    bg-black/40 px-3
                    text-sm font-bold text-amber-200
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:border-amber-300/60
                    hover:bg-amber-400/15 active:transition-none active:bg-amber-400/15
                    hover:text-white active:text-white
                    hover:shadow-[0_0_18px_rgba(245,158,11,0.35)]
                    sm:h-12 sm:w-fit sm:rounded-2xl
                    sm:px-5 sm:text-base
                    lg:text-lg
                  "
                >
                  <Edit3
                    className="
                      mr-2 h-4 w-4 shrink-0
                      transition-transform duration-300
                      group-hover:rotate-6
                      group-hover:scale-110
                      sm:h-5 sm:w-5
                    "
                  />

                  <span className="truncate">Edit Featured</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

function FeaturedHeader() {
  return (
    <header
      className="
        flex min-w-0 flex-col gap-3
        sm:flex-row sm:items-center
        sm:justify-between sm:gap-4
      "
    >
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <div
          className="
            shrink-0 rounded-xl
            border border-white/10
            bg-white/10 p-2.5
            shadow-[0_0_12px_rgba(245,158,11,0.16)]
            sm:rounded-2xl sm:p-3
          "
        >
          <Star className="h-5 w-5 text-amber-300 sm:h-6 sm:w-6" />
        </div>

        <h2
          className="
            min-w-0 break-words
            font-marcellus text-2xl
            leading-tight text-white
            sm:text-3xl
            lg:text-4xl
          "
        >
          Featured Video
        </h2>
      </div>

      <Button
        type="button"
        variant="outline"
        className="
          group h-10 w-full min-w-0
          cursor-pointer rounded-xl
          border-amber-300/40
          bg-amber-400/10 px-3
          text-sm font-bold text-amber-100
          transition-all duration-300
          hover:-translate-y-0.5
          hover:bg-amber-400/80 active:transition-none active:bg-amber-400/80
          hover:text-black active:text-black
          hover:shadow-[0_0_22px_rgba(245,158,11,0.48)]
          sm:h-11 sm:w-fit sm:rounded-2xl
          sm:px-4 sm:text-base
          lg:h-12 lg:px-5 lg:text-lg
        "
      >
        <Star
          className="
            mr-2 h-4 w-4 shrink-0
            transition-transform duration-300
            group-hover:rotate-12
            group-hover:scale-125
            sm:h-5 sm:w-5
          "
        />

        <span className="truncate">Set Featured</span>
      </Button>
    </header>
  );
}
