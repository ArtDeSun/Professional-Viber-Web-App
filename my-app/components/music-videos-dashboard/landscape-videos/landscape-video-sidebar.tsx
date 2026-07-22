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
      className="pointer-events-none
                  fixed left-2 top-24 z-40
                  sm:left-4 sm:top-20
                  lg:left-6 lg:top-32
                "
    >
      <div className="relative mb-3 h-11 w-[calc(100vw-4rem)] max-w-72 sm:h-12 lg:hidden">
        <div
          aria-hidden="true"
          className={`
            absolute inset-0
            rounded-xl
            border border-amber-400/20
            bg-black/70
            shadow-[0_0_18px_rgba(245,158,11,0.25)]
            backdrop-blur-md
            transition-[width] duration-600
            ease-[cubic-bezier(0.22,1,0.36,1)]
            sm:rounded-2xl

            ${
              open
                ? `w-full
                   sm:px-4
                `
                : `w-16
                   sm:w-18
                `
            }
          `}
        />

        <button
          type="button"
          aria-label={open ? "Collapse sections" : "Expand sections"}
          aria-expanded={open}
          aria-controls="landscape-video-sidebar-content"
          onClick={() => onOpenChange(!open)}
          className={`
            pointer-events-auto
            relative z-10
            flex h-11 cursor-pointer
            items-center justify-between px-3 text-gray-100
            transition-[width,color] duration-300
            hover:text-amber-400 active:text-amber-400
            sm:h-12

            ${
              open
                ? `
                  w-full
                  sm:px-4
                `
                : `
                  w-16
                  sm:w-18
                `
            }
          `}
        >
          <PanelLeft className="h-5 w-5 shrink-0" />

          <span
            className={`
              min-w-0 overflow-hidden whitespace-nowrap
              font-marcellus text-base
              transition-[width,margin-left] duration-300
              sm:text-lg

              ${
                open
                  ? `
                    ml-3 
                    w-24
                  `
                  : `
                    ml-0 
                    w-0
                  `
              }
            `}
          >
            Sections
          </span>

          <ChevronRight
            className={`
              h-5 w-5 shrink-0
              transition-[transform] duration-300

              ${
                open
                  ? `
                    rotate-180
                  `
                  : `
                    rotate-0
                  `
              }
            `}
          />
        </button>
      </div>

      <div
        id="landscape-video-sidebar-content"
        className={`
          left-0
          w-[calc(100vw-4rem)]
          bg-black/70
          max-w-72
          transition-[opacity] duration-400
          ease-[cubic-bezier(0.22,1,0.36,1)]

          sm:top-15 sm:w-72

          ${
            open
              ? `
                pointer-events-auto
                opacity-100
              `
              : `
                pointer-events-none
                opacity-0
              `
          }

          lg:static
          lg:w-full
          lg:max-w-none
          lg:pointer-events-auto
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
                    active:bg-white/10
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
              text-black
              shadow-[0_0_16px_rgba(245,158,11,0.45)]
              sm:text-lg
            `
            : `
              text-gray-300
              hover:bg-white/10
              active:bg-white/10
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
