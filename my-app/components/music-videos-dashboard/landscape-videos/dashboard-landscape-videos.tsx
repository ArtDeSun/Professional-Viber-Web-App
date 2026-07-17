"use client";

import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { FeaturedLandscapeVideo } from "./featured-landscape-video";
import {
  featuredLandscapeVideo,
  initialLandscapeVideoSections,
} from "./landscape-video-data";
import { LandscapeVideoSection } from "./landscape-video-section";
import { LandscapeVideoSidebar } from "./landscape-video-sidebar";

export default function DashboardLandscapeVideos() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("featured");

  const [videoSections, setVideoSections] = useState(
    initialLandscapeVideoSections,
  );

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

  const scrollToTop = () => {
    setActiveSection("featured");
    window.history.replaceState(null, "", window.location.pathname);

    window.dispatchEvent(new Event("navbar-route-change"));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main
      className="
      relative min-h-screen
      py-32 font-redHatDisplay text-white
      sm:py-36
      lg:py-46
    "
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_38%),radial-gradient(circle_at_bottom,rgba(245,158,11,0.14),transparent_38%)]" />

      <div
        className="
                    relative mx-auto w-full max-w-8xl
                    px-4 pl-20
                    sm:px-6 sm:pl-24
                    lg:pl-[17rem]
                  "
      >
        <LandscapeVideoSidebar
          activeSection={activeSection}
          videoSections={videoSections}
          loading={leftColumnLoading}
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          onScrollToTop={scrollToTop}
          onScrollToSection={scrollToSection}
        />

        <section className="min-w-0 space-y-10 lg:space-y-12">
          <DashboardLandscapeHeader />

          {!hasVideos && <EmptyLandscapeState />}

          <FeaturedLandscapeVideo video={featuredLandscapeVideo} />

          <div className="space-y-12 lg:space-y-14">
            {videoSections.map((section) => (
              <LandscapeVideoSection key={section.id} section={section} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardLandscapeHeader() {
  return (
    <header className="flex flex-col justify-between gap-6 rounded-3xl border border-amber-400/15 bg-black/40 p-8 shadow-[0_0_18px_rgba(245,158,11,0.12)] backdrop-blur-md lg:flex-row lg:items-end">
      <div className="max-w-4xl space-y-4">
        <h1 className="font-marcellus text-6xl text-amber-300">Videos</h1>

        <p className="max-w-3xl text-lg leading-8 text-gray-300">
          Manage long-form videos, covers, performances, tutorials, and featured
          uploads.
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
  );
}

function EmptyLandscapeState() {
  return (
    <section className="rounded-3xl border border-amber-400/15 bg-black/40 p-10 shadow-[0_0_18px_rgba(245,158,11,0.12)] backdrop-blur-md">
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
      </div>
    </section>
  );
}
