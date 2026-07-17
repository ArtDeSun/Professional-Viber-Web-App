import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUp,
  ChevronRight,
  Loader2,
  PanelLeft,
  Plus,
  Star,
} from "lucide-react";
import type { ElementType } from "react";
import type { LandscapeVideoSectionData } from "./landscape-video-types";

type LandscapeVideoSidebarProps = {
  activeSection: string;
  videoSections: LandscapeVideoSectionData[];
  loading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScrollToTop: () => void;
  onScrollToSection: (id: string) => void;
};

export function LandscapeVideoSidebar({
  activeSection,
  videoSections,
  loading,
  open,
  onOpenChange,
  onScrollToTop,
  onScrollToSection,
}: LandscapeVideoSidebarProps) {
  const handleScrollToTop = () => {
    onOpenChange(false);
    onScrollToTop();
  };

  const handleScrollToSection = (id: string) => {
    onOpenChange(false);
    onScrollToSection(id);
  };

  return (
    <aside
      className={`
        fixed left-3 top-40 z-40 h-fit
        transition-[width] duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${open ? "w-72" : "w-14"}

        sm:left-4
        lg:left-6 lg:w-56
      `}
    >
      <button
        type="button"
        aria-label={open ? "Collapse sections" : "Expand sections"}
        aria-expanded={open}
        aria-controls="landscape-video-sidebar-content"
        onClick={() => onOpenChange(!open)}
        className="
          mb-3 flex h-12 w-full cursor-pointer
          items-center rounded-2xl
          border border-amber-400/20 bg-black/70
          px-4 text-gray-100
          shadow-[0_0_18px_rgba(245,158,11,0.25)]
          backdrop-blur-md
          transition-all duration-300
          hover:border-amber-300/40
          hover:text-amber-200
          lg:hidden
        "
      >
        <PanelLeft className="h-5 w-5 shrink-0 text-amber-300" />

        <span
          className={`
            min-w-0 overflow-hidden whitespace-nowrap
            font-marcellus text-lg
            transition-[width,opacity,margin] duration-300

            ${open ? "ml-3 w-full opacity-100" : "ml-0 w-0 opacity-0"}
          `}
        >
          Sections
        </span>

        <ChevronRight
          className={`
            h-5 w-5 shrink-0 text-amber-300
            transition-transform duration-300

            ${open ? "rotate-180" : "rotate-0"}
          `}
        />
      </button>

      <div
        id="landscape-video-sidebar-content"
        className={`
          origin-left transition-all duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            open
              ? "visible translate-x-0 opacity-100"
              : "invisible -translate-x-3 opacity-0"
          }

          lg:visible lg:translate-x-0 lg:opacity-100
        `}
      >
        {loading ? (
          <LeftColumnLoadingBox sectionCount={videoSections.length} />
        ) : (
          <Card
            className="
              overflow-hidden rounded-3xl
              border-amber-400/20 bg-black/70
              shadow-[0_0_18px_rgba(245,158,11,0.5)]
              backdrop-blur-md
              lg:bg-black/45
            "
          >
            <CardContent className="space-y-8 p-4 lg:space-y-12">
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={handleScrollToTop}
                  className="
                    group relative h-10 w-3/4
                    cursor-pointer overflow-hidden rounded-xl
                    bg-amber-400 text-sm text-black
                    shadow-[0_0_14px_rgba(245,158,11,0.35)]
                    transition-shadow duration-300
                    hover:shadow-[0_0_22px_rgba(245,158,11,0.6)]
                  "
                >
                  <span
                    className="
                      absolute inset-0 origin-top bg-amber-600
                      transition-transform duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-y-0
                    "
                  />

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
                    onClick={handleScrollToSection}
                  />

                  {videoSections.map((section) => (
                    <SidebarButton
                      key={section.id}
                      id={section.id}
                      label={section.label}
                      icon={section.icon}
                      activeSection={activeSection}
                      onClick={handleScrollToSection}
                    />
                  ))}
                </div>

                <Button
                  type="button"
                  className="
                    flex h-10 w-full cursor-pointer
                    items-center justify-center gap-2
                    rounded-xl border border-gray-300/20
                    bg-black/30 font-marcellus text-lg text-gray-100
                    transition-all duration-300
                    hover:border-amber-300/30
                    hover:bg-white/10 hover:text-amber-200
                    hover:shadow-[0_0_12px_rgba(245,158,11,0.18)]
                  "
                >
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </nav>
            </CardContent>
          </Card>
        )}
      </div>
    </aside>
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
          ? "bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-xl font-bold text-black shadow-[0_0_16px_rgba(245,158,11,0.45)]"
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

function LeftColumnLoadingBox({ sectionCount }: { sectionCount: number }) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-amber-400/15 bg-black/45 shadow-[0_0_18px_rgba(245,158,11,0.25)] backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[sidebar-shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <CardContent className="relative space-y-12 p-4">
        <div className="flex justify-center">
          <div className="h-10 w-3/4 animate-pulse rounded-xl bg-neutral-700/80" />
        </div>

        <div className="space-y-6">
          <div className="mx-auto h-10 w-40 animate-pulse rounded-xl bg-neutral-700/80" />

          <div className="space-y-2">
            {Array.from({ length: sectionCount + 1 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl bg-neutral-800/80 px-3 py-3"
              >
                <div className="h-5 w-5 shrink-0 animate-pulse rounded-md bg-neutral-600/80" />
                <div className="h-5 flex-1 animate-pulse rounded-md bg-neutral-600/80" />
              </div>
            ))}
          </div>

          <div className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-gray-300/10 bg-neutral-800/80">
            <Loader2 className="h-4 w-4 animate-spin text-amber-300" />
            <span className="text-lg text-gray-400">Loading sections</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
