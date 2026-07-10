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
  ArrowUp,
  Edit3,
  EllipsisVertical,
  ExternalLink,
  Film,
  Loader2,
  Music,
  Piano,
  Plus,
  Radio,
  Smartphone,
  Star,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

const TEST_YOUTUBE_URL = "https://www.youtube.com/watch?v=TuZ4Xcb7D9w";
const TEST_YOUTUBE_EMBED = "https://www.youtube.com/embed/TuZ4Xcb7D9w";

type LandscapeVideo = {
  id: string;
  title: string;
  sourceType: "youtube" | "upload";
  youtubeUrl?: string;
  thumbnailUrl?: string;
  youtubeEmbedUrl?: string;
  duration?: string;
  uploadedAt?: string;
};

const featuredLandscapeVideo: LandscapeVideo = {
  id: "featured-1",
  title: "Expressive long-form piano showcase",
  sourceType: "youtube",
  youtubeUrl: TEST_YOUTUBE_URL,
  youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
  duration: "3:50",
  uploadedAt: "Testing",
};

const makeVideo = (id: string, title: string): LandscapeVideo => ({
  id,
  title,
  sourceType: "youtube",
  youtubeUrl: TEST_YOUTUBE_URL,
  youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
  duration: "3:50",
  uploadedAt: "Testing",
});

const initialLandscapeVideoSections = [
  {
    id: "latest",
    label: "Latest Videos",
    icon: Video,
    videos: [
      makeVideo("latest-1", "Cinematic piano textures and ambient harmony"),
      makeVideo("latest-2", "Complete music performance with storytelling"),
    ],
  },
  {
    id: "covers",
    label: "Covers",
    icon: Music,
    videos: [
      makeVideo("covers-1", "Sentimental piano cover in ultra-wide format"),
      makeVideo("covers-2", "21-century cover with epic keyboard plugins"),
    ],
  },
  {
    id: "piano",
    label: "Solo Piano",
    icon: Piano,
    videos: [
      makeVideo("piano-1", "Solo piano performance with Chopinesque phrasing"),
      makeVideo("piano-2", "Classical-inspired long-form piano session"),
    ],
  },
  {
    id: "production",
    label: "Tutorials",
    icon: Film,
    videos: [
      makeVideo(
        "tutorial-1",
        "Building a full music video from beginning to finish",
      ),
      makeVideo(
        "tutorial-2",
        "Spice up your R&B arrangement with these 3 Jazz chords",
      ),
    ],
  },
  {
    id: "live",
    label: "Live Sessions",
    icon: Radio,
    videos: [
      makeVideo("live-1", "Live studio session with ambient sounds"),
      makeVideo("live-2", "Improvised cinematic live performance"),
    ],
  },
];

type ExtractedYoutubeMetadata = {
  title: string;
  duration: string;
  uploadedAt: string;
  thumbnailUrl: string;
  youtubeEmbedUrl: string;
};

async function extractYoutubeMetadata(
  youtubeUrl: string,
): Promise<ExtractedYoutubeMetadata> {
  const response = await fetch("/api/youtube-metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      youtubeUrl,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error ?? `Unable to extract YouTube metadata (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("The metadata server returned an invalid response");
  }

  return data;
}

async function createVideoFromYoutubeLink(
  youtubeUrl: string,
): Promise<LandscapeVideo> {
  const metadata = await extractYoutubeMetadata(youtubeUrl);

  return {
    id: crypto.randomUUID(),
    sourceType: "youtube",
    youtubeUrl,
    title: metadata.title,
    duration: metadata.duration,
    uploadedAt: metadata.uploadedAt,
    thumbnailUrl: metadata.thumbnailUrl,
    youtubeEmbedUrl: metadata.youtubeEmbedUrl,
  };
}

export default function DashboardLandscapeVideos() {
  //const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("featured");
  //const [leftColumnLoading, setLeftColumnLoading] = useState(true);
  const [videoSections, setVideoSections] = useState(
    initialLandscapeVideoSections,
  );
  /* Future database integration:
  const [videoSections, setVideoSections] = useState<typeof initialLandscapeVideoSections>([]);
  */

  const leftColumnLoading = videoSections.length === 0;

  const hasVideos =
    Boolean(featuredLandscapeVideo) ||
    videoSections.some((section) => section.videos.length > 0);

  const videoSectionIds = videoSections.map((section) => section.id).join("|");

  useEffect(() => {
    const sectionIds = [
      "featured",
      ...videoSectionIds.split("|").filter(Boolean),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [videoSectionIds]);

  /* Future database integration:
  useEffect(() => {
    async function loadSections() {
      setLeftColumnLoading(true);

      try {
        const sections = await fetchSections();
        setVideoSections(sections);
      } finally {
        setLeftColumnLoading(false);
      }
    }

    loadSections();
  }, []);
  */

  /*   useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLeftColumnLoading(false);
    }, 800);

    return () => window.clearTimeout(timeout);
  }, []); */

  const scrollToTop = () => {
    window.history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new Event("navbar-route-change"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <main className="relative min-h-screen py-32 text-white font-redHatDisplay">
      <div
        className="pointer-events-none absolute inset-0 
        bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_38%),radial-gradient(circle_at_bottom,rgba(245,158,11,0.14),transparent_38%)]"
      />

      <div className="relative mx-auto flex w-full max-w-8xl items-start gap-6 px-6 lg:pl-[17rem]">
        <aside className="fixed left-6 top-28 z-40 hidden h-fit w-56 shrink-0 lg:block">
          {leftColumnLoading ? (
            <LeftColumnLoadingBox />
          ) : (
            <Card className="rounded-3xl border-amber-400/20 bg-black/45 shadow-[0_0_18px_rgba(245,158,11,0.5)] backdrop-blur-md">
              <CardContent className="space-y-12 p-4">
                <div className="flex justify-center">
                  <Button
                    type="button"
                    onClick={scrollToTop}
                    className="group relative h-10 w-3/4 cursor-pointer overflow-hidden rounded-xl bg-amber-400 text-sm text-black shadow-[0_0_14px_rgba(245,158,11,0.35)] transition-shadow duration-300 hover:shadow-[0_0_22px_rgba(245,158,11,0.6)]"
                  >
                    <span className="absolute inset-0 origin-top bg-amber-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-0" />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ArrowUp className="h-4 w-4" />
                      Back to Top
                    </span>
                  </Button>
                </div>

                <nav className="space-y-6">
                  <p className="text-center font-marcellus text-4xl tracking-wide text-gray-100">
                    Sections
                  </p>

                  <div className="space-y-2">
                    <SidebarButton
                      id="featured"
                      label="Featured"
                      icon={Star}
                      activeSection={activeSection}
                      onClick={scrollToSection}
                    />

                    {videoSections.map((section) => (
                      <SidebarButton
                        key={section.id}
                        id={section.id}
                        label={section.label}
                        icon={section.icon}
                        activeSection={activeSection}
                        onClick={scrollToSection}
                      />
                    ))}
                  </div>

                  <Button
                    type="button"
                    className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300/20 bg-black/30 font-marcellus text-lg text-gray-100 transition-all duration-300 hover:border-amber-300/30 hover:bg-white/10 hover:text-amber-200 hover:shadow-[0_0_12px_rgba(245,158,11,0.18)]"
                  >
                    <Plus className="h-4 w-4" />
                    Add Section
                  </Button>
                </nav>
              </CardContent>
            </Card>
          )}
        </aside>

        <section className="min-w-0 flex-1 space-y-12">
          <header
            className="flex flex-col justify-between gap-6 rounded-3xl 
            border border-amber-400/15 bg-black/40 p-8 shadow-[0_0_18px_rgba(245,158,11,0.12)] 
            backdrop-blur-md lg:flex-row lg:items-end"
          >
            <div className="max-w-4xl">
              {/* <p className="font-marcellus text-xl text-amber-300">
                Video Dashboard
              </p>

              <h1 className="mt-2 font-marcellus text-6xl text-white">
                Videos
              </h1> */}

              <h1 className="font-marcellus text-6xl text-amber-300">Videos</h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">
                Manage long-form videos, covers, performances, tutorials, and
                featured uploads.
              </p>
            </div>
            <Button
              asChild
              className="group relative h-11 cursor-pointer overflow-hidden rounded-xl bg-amber-400 px-5 text-xl font-bold text-black shadow-[0_0_14px_rgba(245,158,11,0.35)] transition-shadow duration-300 hover:shadow-[0_0_22px_rgba(245,158,11,0.6)]"
            >
              <Link href="/dashboard-portrait-videos">
                <span className="absolute inset-0 origin-right bg-amber-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-0" />
                <span className="relative z-10 flex items-center gap-2">
                  <Smartphone className="h-4 w-4 [stroke-width:3]" />
                  Manage Shorts
                </span>
              </Link>
            </Button>
          </header>

          {!hasVideos && <EmptyLandscapeState />}

          <FeaturedLandscapeVideoSection video={featuredLandscapeVideo} />

          <div className="space-y-14">
            {videoSections.map((section) => (
              <LandscapeVideoSection key={section.id} section={section} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function LeftColumnLoadingBox() {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-amber-400/15 bg-black/45 shadow-[0_0_18px_rgba(245,158,11,0.25)] backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[sidebar-shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <CardContent className="relative space-y-12 p-4">
        <div className="flex justify-center">
          <div className="h-10 w-3/4 animate-pulse rounded-xl bg-neutral-700/80" />
        </div>

        <div className="space-y-6">
          <div className="mx-auto h-10 w-3/4 animate-pulse rounded-xl bg-neutral-700/80" />

          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex h-12 items-center gap-3 rounded-2xl bg-neutral-800/80 px-3"
              >
                <div className="h-5 w-5 animate-pulse rounded-md bg-neutral-600/80" />
                <div className="h-4 flex-1 animate-pulse rounded-md bg-neutral-600/80" />
              </div>
            ))}
          </div>

          <div className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-300/10 bg-neutral-800/80">
            <Loader2 className="h-4 w-4 animate-spin text-amber-300" />
            <span className="text-sm text-gray-400">Loading sections</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SidebarButton({
  id,
  label,
  icon: Icon,
  activeSection,
  onClick,
}: {
  id: string;
  label: string;
  icon: ElementType;
  activeSection: string;
  onClick: (id: string) => void;
}) {
  const isActive = activeSection === id;

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left text-lg transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-black font-bold text-xl shadow-[0_0_16px_rgba(245,158,11,0.45)]"
          : "text-gray-300 hover:bg-white/10 hover:text-amber-200 hover:shadow-[0_0_14px_rgba(245,158,11,0.18)]"
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 ${
          isActive ? "text-black" : "text-amber-300"
        }`}
      />
      <span className="font-marcellus leading-tight">{label}</span>
    </button>
  );
}

function EmptyLandscapeState() {
  return (
    <section className="rounded-3xl border border-amber-400/15 bg-black/40 p-10 text-center shadow-[0_0_18px_rgba(245,158,11,0.12)] backdrop-blur-md">
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <div className="mb-5 rounded-full border border-white/10 bg-white/10 p-5">
          <FaYoutube className="h-12 w-12 text-red-500" />
        </div>

        <h2 className="font-marcellus text-4xl text-white">
          No landscape videos yet
        </h2>

        <p className="mt-3 text-base leading-7 text-gray-300">
          Upload your first long-form video or add a YouTube embed.
        </p>

        <Button className="group relative mt-6 h-11 cursor-pointer overflow-hidden rounded-xl bg-amber-400 px-5 text-base text-black shadow-[0_0_14px_rgba(245,158,11,0.35)] transition-shadow duration-300 hover:shadow-[0_0_22px_rgba(245,158,11,0.6)]">
          <span className="absolute inset-0 origin-top bg-amber-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-0" />
          <span className="relative z-10 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload videos
          </span>
        </Button>
      </div>
    </section>
  );
}

function FeaturedLandscapeVideoSection({
  video,
}: {
  video: LandscapeVideo | null;
}) {
  return (
    <section id="featured" className="scroll-mt-32 space-y-5 mx-4">
      <SectionHeader
        icon={Star}
        title="Featured Video"
        actionLabel="Set Featured"
      />

      {!video ? (
        <Card className="rounded-3xl border-white/10 bg-black/30">
          <CardContent className="p-8 text-center text-gray-400">
            No featured video selected yet.
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden rounded-3xl border-amber-400/15 bg-neutral-900/90 p-2 shadow-[0_0_18px_rgba(245,158,11,0.14)]">
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

function LandscapeVideoSection({
  section,
}: {
  section: {
    id: string;
    label: string;
    icon: ElementType;
    videos: LandscapeVideo[];
  };
}) {
  return (
    /* <section id={section.id} className="scroll-mt-32 space-y-5"> */
    <section
      id={section.id}
      className="scroll-mt-32 mx-8 space-y-5 rounded-3xl border border-gray-300/15 bg-neutral-900/50 p-5"
    >
      <SectionHeader
        icon={section.icon}
        title={section.label}
        actionLabel="Add Video"
      />

      {section.videos.length === 0 ? (
        <Card className="rounded-3xl border-white/10 bg-black/30">
          <CardContent className="p-8 text-center text-gray-400">
            No videos in this section yet.
          </CardContent>
        </Card>
      ) : (
        /* <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3"> */
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {section.videos.map((video) => (
            <LandscapeVideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  actionLabel,
}: {
  icon: ElementType;
  title: string;
  actionLabel: string;
}) {
  const isFeaturedAction = actionLabel === "Set Featured";

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
        className={`group h-12 cursor-pointer rounded-2xl px-5 text-lg font-bold transition-all duration-300 hover:-translate-y-0.5 ${
          isFeaturedAction
            ? "border-amber-300/40 bg-amber-400/10 text-amber-100 hover:bg-amber-400/80 hover:text-black hover:shadow-[0_0_22px_rgba(245,158,11,0.48)]"
            : "border-amber-400/25 bg-black/30 text-amber-200 hover:bg-amber-400/10 hover:text-white hover:shadow-[0_0_16px_rgba(245,158,11,0.28)]"
        }`}
      >
        {isFeaturedAction ? (
          <Star className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
        ) : (
          <Upload className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
        )}

        {actionLabel}
      </Button>
    </header>
  );
}

function LandscapeVideoCard({ video }: { video: LandscapeVideo }) {
  return (
    <Card
      className="group overflow-hidden rounded-3xl
                border border-gray-300/15
                bg-neutral-800/70
                p-3
                shadow-[0_8px_28px_rgba(0,0,0,0.35)]
                transition-all duration-300
                hover:border-amber-300/30
                hover:shadow-[0_0_18px_rgba(245,158,11,0.18)]"
    >
      <CardContent
        className="relative overflow-hidden rounded-[1.35rem]
                  border border-gray-300/10
                  bg-neutral-900
                  p-0"
      >
        <VideoFrame video={video} />

        <div className="relative min-h-32 p-4">
          <div
            className="
                      absolute -top-5 left-24
                      rounded-xl
                      border border-gray-300/15
                      bg-neutral-800
                      px-3 py-2
                      shadow-[0_6px_18px_rgba(0,0,0,0.45)]
                    "
          >
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

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  aria-label={`Open options for ${video.title}`}
                  className="shrink-0 cursor-pointer rounded-full border border-amber-300/20 bg-black/40 text-gray-200 shadow-[0_4px_14px_rgba(0,0,0,0.3)] 
                             transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/50 hover:bg-amber-400/80 hover:text-black hover:shadow-[0_0_18px_rgba(245,158,11,0.45)] 
                             data-[state=open]:border-amber-300 data-[state=open]:bg-amber-400/80 data-[state=open]:text-black data-[state=open]:shadow-[0_0_18px_rgba(245,158,11,0.45)]"
                >
                  <EllipsisVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-60 rounded-3xl border border-amber-300/20 bg-neutral-950/95 p-2 font-redHatDisplay text-gray-100 shadow-[0_0_24px_rgba(245,158,11,0.28)] backdrop-blur-xl"
              >
                {/* <DropdownMenuItem asChild>
                  <a
                    href={video.youtubeUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="group flex cursor-pointer items-center rounded-2xl px-3 py-3 text-base font-medium transition-colors duration-200 focus:bg-red-600 focus:text-white"
                  >
                    <FaYoutube className="mr-3 h-5 w-5 text-red-500 transition-transform duration-300 group-hover:scale-110 group-focus:text-white" />

                    <span className="flex-1">Open YouTube</span>

                    <ExternalLink className="h-4 w-4 text-gray-400 group-focus:text-white" />
                  </a>
                </DropdownMenuItem> */}

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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function VideoFrame({
  video,
  featured = false,
}: {
  video: LandscapeVideo;
  featured?: boolean;
}) {
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
        <button type="button" className="h-full w-full cursor-pointer">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover"
          />
        </button>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          No video preview available
        </div>
      )}

      {/* {video.duration && (
        <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs text-white">
          {video.duration}
        </span>
      )} */}
    </div>
  );
}
