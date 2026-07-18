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
      className="
                  fixed left-2 top-24 z-40
                  w-12
                  sm:left-4 sm:top-20 sm:w-14
                  lg:left-6 lg:top-34 lg:w-56
                "
    >
      <button
        type="button"
        aria-label={open ? "Collapse sections" : "Expand sections"}
        aria-expanded={open}
        aria-controls="landscape-video-sidebar-content"
        onClick={() => onOpenChange(!open)}
        className={`
          mb-3 flex h-11 cursor-pointer
          items-center rounded-xl
          border border-amber-400/20
          bg-black/70 text-gray-100
          shadow-[0_0_18px_rgba(245,158,11,0.25)]
          backdrop-blur-md
          transition-[width,border-color,color] duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:border-amber-300/40
          hover:text-amber-200
          sm:h-12 sm:rounded-2xl
          lg:hidden

          ${
            open
              ? `
                w-[calc(100vw-4rem)]
                justify-start px-3
                max-w-72 sm:px-4
              `
              : `
                w-12 justify-center px-0
                sm:w-14
              `
          }
        `}
      >
        <PanelLeft className="h-5 w-5 shrink-0 text-amber-300" />

        <span
          className={`
            min-w-0 overflow-hidden whitespace-nowrap
            font-marcellus text-base
            transition-[width,opacity,margin] duration-300
            sm:text-lg

            ${open ? "ml-3 w-full opacity-100" : "ml-0 w-0 opacity-0"}
          `}
        >
          Sections
        </span>

        <ChevronRight
          className={`
            shrink-0 text-amber-300
            transition-[width,opacity,transform] duration-300

            ${
              open
                ? "h-5 w-5 rotate-180 opacity-100"
                : "h-5 w-0 rotate-0 opacity-0"
            }
          `}
        />
      </button>

      <div
        id="landscape-video-sidebar-content"
        className={`
          absolute left-0 top-14
          w-[calc(100vw-4rem)]
          max-w-72
          origin-left
          transition-[opacity,transform,visibility] duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]

          sm:top-15 sm:w-72

          ${
            open
              ? `
                visible
                pointer-events-auto
                translate-x-0
                opacity-100
              `
              : `
                invisible
                pointer-events-none
                -translate-x-3
                opacity-0
              `
          }

          lg:static
          lg:w-full
          lg:max-w-none
          lg:visible
          lg:pointer-events-auto
          lg:translate-x-0
          lg:opacity-100
        `}
      >
        {loading ? (
          <LeftColumnLoadingBox sectionCount={videoSections.length} />
        ) : (
          <Card
            className="
              max-h-[calc(100dvh-10rem)]
              overflow-x-hidden overflow-y-auto
              rounded-2xl
              border-amber-400/20 bg-black/85
              shadow-[0_0_18px_rgba(245,158,11,0.5)]
              backdrop-blur-md
              sm:rounded-3xl
              lg:max-h-none lg:overflow-visible lg:bg-black/45
            "
          >
            <CardContent
              className="
                min-w-0 space-y-6 p-3
                sm:space-y-8 sm:p-4
                lg:space-y-12
              "
            >
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={handleScrollToTop}
                  className="
                    group relative h-9 w-full
                    cursor-pointer overflow-hidden rounded-xl
                    bg-amber-400 px-2
                    text-xs text-black
                    shadow-[0_0_14px_rgba(245,158,11,0.35)]
                    transition-shadow duration-300
                    hover:shadow-[0_0_22px_rgba(245,158,11,0.6)]
                    sm:h-10 sm:w-3/4 sm:text-sm
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

                  <span className="relative z-10 flex min-w-0 items-center justify-center gap-2">
                    <ArrowUp className="h-4 w-4 shrink-0" />
                    <span className="truncate">Back to Top</span>
                  </span>
                </Button>
              </div>

              <nav className="min-w-0 space-y-4 sm:space-y-6">
                <p
                  className="
                    break-words text-center
                    font-marcellus text-2xl
                    tracking-wide text-gray-100
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  Sections
                </p>

                <div className="min-w-0 space-y-1.5 sm:space-y-2">
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
                    flex h-9 w-full min-w-0
                    cursor-pointer items-center justify-center
                    gap-2 rounded-xl
                    border border-gray-300/20
                    bg-black/30 px-2
                    font-marcellus text-sm text-gray-100
                    transition-all duration-300
                    hover:border-amber-300/30
                    hover:bg-white/10 hover:text-amber-200
                    hover:shadow-[0_0_12px_rgba(245,158,11,0.18)]
                    sm:h-10 sm:text-lg
                  "
                >
                  <Plus className="h-4 w-4 shrink-0" />
                  <span className="truncate">Add Section</span>
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
      className={`
        flex w-full min-w-0 cursor-pointer
        items-center gap-2
        rounded-xl px-2.5 py-2.5
        text-left text-sm
        transition-all duration-300
        sm:gap-3 sm:rounded-2xl
        sm:px-3 sm:py-3 sm:text-base
        lg:text-lg

        ${
          isActive
            ? `
              bg-gradient-to-r
              from-amber-300 via-amber-400 to-orange-500
              font-bold text-black
              shadow-[0_0_16px_rgba(245,158,11,0.45)]
              sm:text-lg
              lg:text-xl
            `
            : `
              text-gray-300
              hover:bg-white/10
              hover:text-amber-200
              hover:shadow-[0_0_14px_rgba(245,158,11,0.18)]
            `
        }
      `}
    >
      <Icon
        className={`
          h-4 w-4 shrink-0
          sm:h-5 sm:w-5

          ${isActive ? "text-black" : "text-amber-300"}
        `}
      />

      <span className="min-w-0 break-words font-marcellus leading-tight">
        {label}
      </span>
    </button>
  );
}

function LeftColumnLoadingBox({ sectionCount }: { sectionCount: number }) {
  return (
    <Card
      className="
        relative max-h-[calc(100dvh-10rem)]
        overflow-x-hidden overflow-y-auto
        rounded-2xl
        border-amber-400/15 bg-black/85
        shadow-[0_0_18px_rgba(245,158,11,0.25)]
        backdrop-blur-md
        sm:rounded-3xl
        lg:max-h-none lg:overflow-hidden lg:bg-black/45
      "
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[sidebar-shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <CardContent
        className="
          relative min-w-0 space-y-6 p-3
          sm:space-y-8 sm:p-4
          lg:space-y-12
        "
      >
        <div className="flex justify-center">
          <div className="h-9 w-full animate-pulse rounded-xl bg-neutral-700/80 sm:h-10 sm:w-3/4" />
        </div>

        <div className="min-w-0 space-y-4 sm:space-y-6">
          <div className="mx-auto h-8 w-32 max-w-full animate-pulse rounded-xl bg-neutral-700/80 sm:h-10 sm:w-40" />

          <div className="min-w-0 space-y-2">
            {Array.from({ length: sectionCount + 1 }).map((_, index) => (
              <div
                key={index}
                className="
                  flex min-w-0 items-center
                  gap-2 rounded-xl
                  bg-neutral-800/80 px-2.5 py-2.5
                  sm:gap-3 sm:rounded-2xl
                  sm:px-3 sm:py-3
                "
              >
                <div className="h-4 w-4 shrink-0 animate-pulse rounded-md bg-neutral-600/80 sm:h-5 sm:w-5" />

                <div className="h-4 min-w-0 flex-1 animate-pulse rounded-md bg-neutral-600/80 sm:h-5" />
              </div>
            ))}
          </div>

          <div
            className="
              flex h-9 w-full min-w-0
              items-center justify-center gap-2
              rounded-xl border border-gray-300/10
              bg-neutral-800/80 px-2
              sm:h-10
            "
          >
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-amber-300" />

            <span className="truncate text-sm text-gray-400 sm:text-base lg:text-lg">
              Loading sections
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
