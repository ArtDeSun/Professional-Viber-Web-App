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
    <section id="featured" className="mx-4 scroll-mt-32 space-y-5">
      <FeaturedHeader />

      {!video ? (
        <Card className="rounded-3xl border-amber-400/15 bg-neutral-900/90 shadow-[0_0_18px_rgba(245,158,11,0.25)]">
          <CardContent className="p-8 text-center text-base text-gray-400">
            No featured video selected yet.
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden rounded-3xl border-amber-400/15 bg-neutral-900/90 p-3 shadow-[0_0_18px_rgba(245,158,11,0.5)]">
          <CardContent className="grid gap-6 rounded-2xl border border-white/10 bg-neutral-950 p-4 lg:grid-cols-[1.1fr_0.9fr]">
            <VideoFrame video={video} featured />

            <div className="flex flex-col justify-between gap-5 p-2">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm text-gray-400">
                  <FaYoutube className="h-5 w-5 text-red-500" />
                  Featured upload
                </p>

                <h3 className="font-marcellus text-3xl leading-tight text-white">
                  {video.title}
                </h3>

                {video.duration && video.uploadedAt && (
                  <p className="mt-4 text-sm text-gray-400">
                    {video.duration} • Uploaded {video.uploadedAt}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="group h-12 cursor-pointer rounded-2xl bg-red-600/80 px-5 text-lg font-bold text-white shadow-[0_0_16px_rgba(239,68,68,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/80 hover:shadow-[0_0_24px_rgba(239,68,68,0.6)]"
                >
                  <Link
                    href={video.youtubeUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-125" />
                    Open YouTube
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="group h-12 cursor-pointer rounded-2xl border-amber-400/35 bg-black/40 px-5 text-lg font-bold text-amber-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/60 hover:bg-amber-400/15 hover:text-white hover:shadow-[0_0_18px_rgba(245,158,11,0.35)]"
                >
                  <Edit3 className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                  Edit Featured
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
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 shadow-[0_0_12px_rgba(245,158,11,0.16)]">
          <Star className="h-6 w-6 text-amber-300" />
        </div>

        <h2 className="font-marcellus text-4xl text-white">Featured Video</h2>
      </div>

      <Button
        type="button"
        variant="outline"
        className="group h-12 cursor-pointer rounded-2xl border-amber-300/40 bg-amber-400/10 px-5 text-lg font-bold text-amber-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400/80 hover:text-black hover:shadow-[0_0_22px_rgba(245,158,11,0.48)]"
      >
        <Star className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
        Set Featured
      </Button>
    </header>
  );
}
