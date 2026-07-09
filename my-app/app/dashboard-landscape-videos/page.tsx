/* import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  ExternalLink,
  Film,
  Music,
  Piano,
  Radio,
  Upload,
  Video,
} from "lucide-react";
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
  title: "Featured landscape video: expressive long-form piano showcase",
  sourceType: "youtube",
  youtubeUrl: TEST_YOUTUBE_URL,
  youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
  duration: "3:50",
  uploadedAt: "Testing",
};

const landscapeVideoSections = [
  {
    id: "latest",
    label: "Latest Videos",
    icon: Video,
    videos: [
      {
        id: "latest-1",
        title: "Latest upload: cinematic piano textures and ambient harmony",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
      {
        id: "latest-2",
        title: "New long-form music performance with expressive storytelling",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
    ],
  },
  {
    id: "covers",
    label: "Covers",
    icon: Music,
    videos: [
      {
        id: "covers-1",
        title: "Emotional piano cover arranged for landscape video format",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
      {
        id: "covers-2",
        title: "Modern cover performance with cinematic keyboard layers",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
    ],
  },
  {
    id: "piano",
    label: "Piano Performances",
    icon: Piano,
    videos: [
      {
        id: "piano-1",
        title: "Solo piano performance with warm expressive phrasing",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
      {
        id: "piano-2",
        title: "Classical-inspired piano session for long-form listening",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
    ],
  },
  {
    id: "production",
    label: "Production / Tutorials",
    icon: Film,
    videos: [
      {
        id: "production-1",
        title: "How I build a full music video arrangement from scratch",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
      {
        id: "production-2",
        title: "Behind the scenes: arranging, recording, and editing workflow",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
    ],
  },
  {
    id: "live",
    label: "Live Sessions",
    icon: Radio,
    videos: [
      {
        id: "live-1",
        title: "Live studio session with piano and ambient production layers",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
      {
        id: "live-2",
        title: "Improvised live performance for a cinematic music set",
        sourceType: "youtube" as const,
        youtubeUrl: TEST_YOUTUBE_URL,
        youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
        duration: "3:50",
        uploadedAt: "Testing",
      },
    ],
  },
];

export default function getDashboardLandScapeVideos() {
  const hasVideos = landscapeVideoSections.some(
    (section) => section.videos.length > 0,
  );
  return (
    <main className="min-h-screen py-32 text-white">
      <div
        className="pointer-events-none fixed inset-0 
                      bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(120,53,15,0.2),transparent_35%)]"
      />
      <div className="relative mx-auto flex w-full max-w-8xl gap-6 px-6">
        <aside className="sticky top-28 hidden h-fit w-64 shrink-0 lg:block">
          <Card className="rounded-3xl border-white/10 bg-black/40 backdrop-blur-md">
            <CardContent className="space-y-4 p-3">

              <nav className="space-y-6">
                <p className="text-center text-3xl text-black text-gray-100">
                  Library
                </p>

                <div className="space-y-2">
                  {landscapeVideoSections.map((section) => {
                    const Icon = section.icon;

                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex flex items-center gap-2 rounded-2xl px-2 py-3 text-center text-lg text-gray-300 
                                   transition hover:bg-white/10 hover:text-white"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{section.label}</span>
                      </a>
                    );
                  })}
                </div>
              </nav>
            </CardContent>
          </Card>
        </aside>

        <section className="min-w-0 flex-1 space-y-12">
          <header
            className="flex flex-col justify-between gap-6 
                             rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-md 
                             lg:flex-row lg:items-end"
          >
            <div className="max-w-4xl">
              <p className="font-marcellus text-lg text-amber-300">
                Video Dashboard
              </p>
              <h1 className="mt-2 font-marcellus text-5xl text-white">
                Landscape Videos
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-gray-300">
                Manage long-form YouTube-style videos, covers, performances,
                tutorials, and featured uploads.
              </p>
            </div>

            <Button className="rounded-2xl px-5 py-6 text-base">
              <Upload className="mr-2 h-5 w-5" />
              Upload Landscape Video
            </Button>
          </header>

          {!hasVideos && (
            <section className="rounded-3xl border border-white/10 bg-black/40 p-12 text-center backdrop-blur-md">
              <div className="mx-auto flex max-w-xl flex-col items-center">
                <div className="mb-6 rounded-full border border-white/10 bg-white/10 p-6">
                  <FaYoutube className="h-14 w-14" />
                </div>

                <h2 className="font-marcellus text-4xl">
                  No landscape videos yet
                </h2>

                <p className="mt-4 text-gray-300">
                  Upload your first long-form video or add a YouTube embed to
                  start organizing your landscape video library.
                </p>

                <Button className="mt-8 rounded-2xl px-6 py-6">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload videos
                </Button>
              </div>
            </section>
          )}

          <FeaturedLandscapeVideoSection video={featuredLandscapeVideo} />

          <div className="space-y-14">
            {landscapeVideoSections.map((section) => (
              <LandscapeVideoSection key={section.id} section={section} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function FeaturedLandscapeVideoSection({
  video,
}: {
  video: LandscapeVideo | null;
}) {
  return (
    <section className="space-y-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
            <Video className="h-6 w-6 text-amber-300" />
          </div>
          <h2 className="font-marcellus text-3xl text-white">Featured Video</h2>
        </div>
        <Button variant="outline" className="rounded-2xl">
          <Upload className="mr-2 h-4 w-4" />
          Set Featured
        </Button>
      </header>

      {!video ? (
        <Card className="rounded-3xl border-white/10 bg-black/30">
          <CardContent className="p-8 text-center text-gray-400">
            No featured video selected yet.
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden rounded-3xl border-white/10 bg-neutral-900/90 p-2">
          <CardContent className="grid gap-6 rounded-2xl border border-white/10 bg-neutral-950 p-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              <iframe
                src={video.youtubeEmbedUrl}
                title={video.title}
                allowFullScreen
                className="h-full w-full"
              />
              {video.duration && (
                <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs text-white">
                  {video.duration}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-between gap-6 p-2">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm text-gray-400">
                  <FaYoutube className="h-5 w-5 text-red-500" />
                  Featured landscape upload
                </p>
                <h3 className="text-2xl font-semibold leading-snug text-white">
                  {video.title}
                </h3>
                {video.uploadedAt && (
                  <p className="mt-4 text-sm text-gray-400">
                    Uploaded {video.uploadedAt}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-2xl">
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open YouTube
                  </a>
                </Button>
                <Button variant="outline" className="rounded-2xl">
                  Edit featured
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
    icon: React.ElementType;
    videos: LandscapeVideo[];
  };
}) {
  const Icon = section.icon;

  return (
    <section id={section.id} className="scroll-mt-32 space-y-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
            <Icon className="h-6 w-6 text-amber-300" />
          </div>

          <h2 className="font-marcellus text-3xl text-white">
            {section.label}
          </h2>
        </div>

        <Button variant="outline" className="rounded-2xl">
          <Upload className="mr-2 h-4 w-4" />
          Add video
        </Button>
      </header>

      {section.videos.length === 0 ? (
        <Card className="rounded-3xl border-white/10 bg-black/30">
          <CardContent className="p-8 text-center text-gray-400">
            No videos in this section yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
          {section.videos.map((video) => (
            <LandscapeVideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}

function LandscapeVideoCard({ video }: { video: LandscapeVideo }) {
  return (
    <Card className="group overflow-hidden rounded-3xl border-white/10 bg-neutral-900/90 p-2 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-amber-400/40">
      <CardContent className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-black">
          {video.sourceType === "youtube" && video.youtubeEmbedUrl ? (
            <iframe
              src={video.youtubeEmbedUrl}
              title={video.title}
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <button type="button" className="h-full w-full">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="h-full w-full object-cover"
              />
            </button>
          )}

          {video.duration && (
            <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs text-white">
              {video.duration}
            </span>
          )}
        </div>

        <div className="relative min-h-40 p-5">
          <div className="absolute -top-5 left-5 rounded-2xl border border-white/10 bg-neutral-900 px-3 py-2 shadow-lg">
            <FaYoutube className="h-5 w-5 text-red-500" />
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-white">
                {video.title}
              </h3>

              {video.uploadedAt && (
                <p className="mt-4 text-xs text-gray-400">
                  Uploaded {video.uploadedAt}
                </p>
              )}
            </div>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 rounded-full"
                >
                  <EllipsisVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="rounded-2xl">
                <DropdownMenuItem asChild>
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open YouTube
                  </a>
                </DropdownMenuItem>

                <DropdownMenuItem>Edit details</DropdownMenuItem>
                <DropdownMenuItem>Delete video</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} */

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
  EllipsisVertical,
  ExternalLink,
  Film,
  Music,
  Piano,
  Radio,
  Star,
  Upload,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const landscapeVideoSections = [
  {
    id: "latest",
    label: "Latest Videos",
    icon: Video,
    videos: [
      makeVideo("latest-1", "Cinematic piano textures and ambient harmony"),
      makeVideo("latest-2", "Long-form music performance with storytelling"),
    ],
  },
  {
    id: "covers",
    label: "Covers",
    icon: Music,
    videos: [
      makeVideo("covers-1", "Emotional piano cover in landscape format"),
      makeVideo("covers-2", "Modern cover with cinematic keyboard layers"),
    ],
  },
  {
    id: "piano",
    label: "Piano Performances",
    icon: Piano,
    videos: [
      makeVideo("piano-1", "Solo piano performance with warm phrasing"),
      makeVideo("piano-2", "Classical-inspired long-form piano session"),
    ],
  },
  {
    id: "production",
    label: "Production / Tutorials",
    icon: Film,
    videos: [
      makeVideo("production-1", "Building a full music video arrangement"),
      makeVideo("production-2", "Recording and editing workflow breakdown"),
    ],
  },
  {
    id: "live",
    label: "Live Sessions",
    icon: Radio,
    videos: [
      makeVideo("live-1", "Live studio session with ambient layers"),
      makeVideo("live-2", "Improvised cinematic live performance"),
    ],
  },
];

export default function getDashboardLandScapeVideos() {
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("featured");

  const hasVideos = landscapeVideoSections.some(
    (section) => section.videos.length > 0,
  );

  useEffect(() => {
    const sectionIds = ["featured", ...landscapeVideoSections.map((s) => s.id)];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new Event("navbar-route-change"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen py-32 text-white font-redHatDisplay">
      <div
        className="pointer-events-none fixed inset-0 
        bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(120,53,15,0.16),transparent_35%)]"
      />

      <div className="relative mx-auto flex w-full max-w-8xl items-start gap-6 px-6">
        <aside className="sticky top-28 hidden h-fit w-56 shrink-0 self-start lg:block">
          <Card className="rounded-3xl border-amber-400/20 bg-black/45 shadow-[0_0_18px_rgba(245,158,11,0.18)] backdrop-blur-md">
            <CardContent className="space-y-4 p-4">
              <Button
                type="button"
                onClick={scrollToTop}
                className="group relative h-10 w-full cursor-pointer overflow-hidden rounded-xl bg-amber-400 text-sm text-black shadow-[0_0_14px_rgba(245,158,11,0.35)] transition-shadow duration-300 hover:shadow-[0_0_22px_rgba(245,158,11,0.6)]"
              >
                <span className="absolute inset-0 origin-top bg-amber-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-0" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ArrowUp className="h-4 w-4" />
                  Back to Top
                </span>
              </Button>

              <nav className="space-y-4">
                <p className="text-center font-marcellus text-3xl text-gray-100">
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

                  {landscapeVideoSections.map((section) => (
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
              </nav>
            </CardContent>
          </Card>
        </aside>

        <section className="min-w-0 flex-1 space-y-12">
          <header
            className="flex flex-col justify-between gap-6 rounded-3xl 
            border border-amber-400/15 bg-black/40 p-8 shadow-[0_0_18px_rgba(245,158,11,0.12)] 
            backdrop-blur-md lg:flex-row lg:items-end"
          >
            <div className="max-w-4xl">
              <p className="font-marcellus text-xl text-amber-300">
                Video Dashboard
              </p>

              <h1 className="mt-2 font-marcellus text-6xl text-white">
                Videos
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">
                Manage long-form videos, covers, performances, tutorials, and
                featured uploads.
              </p>
            </div>

            <Button className="group relative h-11 cursor-pointer overflow-hidden rounded-xl bg-amber-400 px-5 text-base text-black shadow-[0_0_14px_rgba(245,158,11,0.35)] transition-shadow duration-300 hover:shadow-[0_0_22px_rgba(245,158,11,0.6)]">
              <span className="absolute inset-0 origin-top bg-amber-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-0" />
              <span className="relative z-10 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Video
              </span>
            </Button>
          </header>

          {!hasVideos && <EmptyLandscapeState />}

          <FeaturedLandscapeVideoSection video={featuredLandscapeVideo} />

          <div className="space-y-14">
            {landscapeVideoSections.map((section) => (
              <LandscapeVideoSection key={section.id} section={section} />
            ))}
          </div>
        </section>
      </div>
    </main>
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
  icon: React.ElementType;
  activeSection: string;
  onClick: (id: string) => void;
}) {
  const isActive = activeSection === id;

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left text-base transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-black shadow-[0_0_16px_rgba(245,158,11,0.45)]"
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
    <section id="featured" className="scroll-mt-32 space-y-5">
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

                {video.uploadedAt && (
                  <p className="mt-4 text-sm text-gray-400">
                    Uploaded {video.uploadedAt}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-10 cursor-pointer rounded-xl bg-red-600 px-4 text-sm text-white shadow-[0_0_12px_rgba(239,68,68,0.35)] transition-shadow duration-300 hover:bg-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.55)]"
                >
                  <Link
                    href={video.youtubeUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open YouTube
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-10 cursor-pointer rounded-xl border-amber-400/25 bg-black/30 px-4 text-sm text-amber-200 transition-all duration-300 hover:bg-amber-400/10 hover:text-white hover:shadow-[0_0_14px_rgba(245,158,11,0.25)]"
                >
                  Edit featured
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
    icon: React.ElementType;
    videos: LandscapeVideo[];
  };
}) {
  return (
    <section id={section.id} className="scroll-mt-32 space-y-5">
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
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
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
  icon: React.ElementType;
  title: string;
  actionLabel: string;
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
        variant="outline"
        className="h-10 cursor-pointer rounded-xl border-amber-400/25 bg-black/30 px-4 text-sm text-amber-200 transition-all duration-300 hover:bg-amber-400/10 hover:text-white hover:shadow-[0_0_14px_rgba(245,158,11,0.25)]"
      >
        <Upload className="mr-2 h-4 w-4" />
        {actionLabel}
      </Button>
    </header>
  );
}

function LandscapeVideoCard({ video }: { video: LandscapeVideo }) {
  return (
    <Card className="group overflow-hidden rounded-3xl border-amber-400/15 bg-neutral-900/90 p-2 shadow-[0_0_18px_rgba(245,158,11,0.1)] transition-all duration-300 hover:border-amber-400/35 hover:shadow-[0_0_22px_rgba(245,158,11,0.2)]">
      <CardContent className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-0">
        <VideoFrame video={video} />

        <div className="relative min-h-36 p-5">
          <div className="absolute -top-5 left-5 rounded-2xl border border-white/10 bg-neutral-900 px-3 py-2 shadow-lg">
            <FaYoutube className="h-5 w-5 text-red-500" />
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="line-clamp-2 font-marcellus text-2xl leading-tight text-white transition-colors duration-300 group-hover:text-amber-200">
                {video.title}
              </h3>

              {video.uploadedAt && (
                <p className="mt-4 text-sm text-gray-400">
                  Uploaded {video.uploadedAt}
                </p>
              )}
            </div>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 cursor-pointer rounded-full transition-all duration-300 hover:bg-amber-400/10 hover:text-amber-200 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                >
                  <EllipsisVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="rounded-2xl border-white/10 bg-black/85 text-gray-100 shadow-[0_0_16px_rgba(245,158,11,0.18)] backdrop-blur-md"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href={video.youtubeUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open YouTube
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer">
                  Edit details
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer text-red-300">
                  Delete video
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
      ) : (
        <button type="button" className="h-full w-full cursor-pointer">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover"
          />
        </button>
      )}

      {video.duration && (
        <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs text-white">
          {video.duration}
        </span>
      )}
    </div>
  );
}
