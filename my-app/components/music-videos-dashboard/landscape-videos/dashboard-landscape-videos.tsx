"use client";

import { Button } from "@/components/ui/button";
import { useLandscapeVideoBoard } from "@/lib/hooks/useLandscapeVideoBoard";
import {
  LandscapeVideo,
  LandscapeVideoBoard,
  LandscapeVideoSection,
} from "@/lib/models/models.types";
import { Smartphone } from "lucide-react";
import Link from "next/link";
import {
  ElementType,
  Suspense,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { FaYoutube } from "react-icons/fa";
import CreateLandscapeVideoSectionDialog, {
  SidebarFooterFallback,
} from "./create-landscape-video-section-dialog";
import { FeaturedLandscapeVideo } from "./featured-landscape-video";
import { DashboardLandscapeVideoSection } from "./landscape-video-section";
import {
  DEFAULT_LANDSCAPE_SECTION_ICON_KEYS,
  LANDSCAPE_SECTION_ICON_CONFIG,
  type LandscapeSectionIconKey,
} from "./landscape-video-section-ui-config";
import {
  FeaturedSidebarButton,
  LandscapeVideoSidebarShell,
  SidebarButton,
  SidebarButtonsFallback,
} from "./landscape-video-sidebar";

interface DashboardLandscapeVideosProps {
  landscapeVideoBoardPromise: Promise<LandscapeVideoBoard>;
  userId: string;
}

interface DashboardLandscapeVideosWithDataProps extends DashboardLandscapeVideosProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onSidebarContentReady: () => void;
}

export default function DashboardLandscapeVideos({
  landscapeVideoBoardPromise,
  userId,
}: DashboardLandscapeVideosProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContentReady, setSidebarContentReady] = useState(false);
  const handleSidebarContentReady = useCallback(() => {
    setSidebarContentReady(true);
  }, []);
  const scrollToTop = () => {
    //setActiveSection("featured");
    window.history.replaceState(null, "", window.location.pathname);

    window.dispatchEvent(new Event("navbar-route-change"));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 
                   bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_38%),radial-gradient(circle_at_bottom,rgba(245,158,11,0.14),transparent_38%)]"
      />

      <LandscapeVideoSidebarShell
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        onScrollToTop={scrollToTop}
        footer={
          <div id="landscape-sidebar-footer-root">
            {!sidebarContentReady && <SidebarFooterFallback />}
          </div>
        }
      >
        <div className="min-w-0">
          {!sidebarContentReady && <SidebarButtonsFallback sectionCount={5} />}
          <div id="landscape-sidebar-buttons-root" className="w-full min-w-0" />
        </div>
      </LandscapeVideoSidebarShell>

      <div
        className="
                    relative mx-auto w-full max-w-8xl
                    px-4 pl-4
                    sm:px-6 sm:pl-24
                    lg:pl-[19rem]
                  "
      >
        <Suspense fallback={<DashboardContentFallback />}>
          <DashboardLandscapeVideosWithData
            landscapeVideoBoardPromise={landscapeVideoBoardPromise}
            userId={userId}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onSidebarContentReady={handleSidebarContentReady}
          />
        </Suspense>
      </div>
    </>
  );
}

function DashboardLandscapeVideosWithData({
  landscapeVideoBoardPromise,
  userId,
  setSidebarOpen,
  onSidebarContentReady,
}: DashboardLandscapeVideosWithDataProps) {
  const initialLandscapeVideoBoard = use(landscapeVideoBoardPromise);
  const [sidebarButtonsRoot, setSidebarButtonsRoot] =
    useState<HTMLElement | null>(null);

  const [sidebarFooterRoot, setSidebarFooterRoot] =
    useState<HTMLElement | null>(null);

  const [createSectionDialogOpen, setCreateSectionDialogOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("featured");

  //const scrollingToCreatedSectionRef = useRef<string | null>(null);

  const {
    landscapeVideoBoard,
    landscapeVideoSections,
    landscapeVideos,
    featuredLandscapeVideo,
    addLandscapeVideoSection,
    modifyLandscapeVideoSection,
    removeLandscapeVideoSection,
    addLandscapeVideo,
    modifyLandscapeVideo,
    removeLandscapeVideo,
  } = useLandscapeVideoBoard(initialLandscapeVideoBoard);

  const landscapeBoardId = landscapeVideoBoard._id;
  const SECTION_UI_STORAGE_KEY = `landscape-video-section-ui-config-${landscapeBoardId}`;
  const [sectionUiConfig, setSectionUiConfig] = useState<
    Record<string, { iconKey: LandscapeSectionIconKey }>
  >({});
  const [sectionUiConfigLoaded, setSectionUiConfigLoaded] = useState(false);

  useEffect(() => {
    const buttonsRoot = document.getElementById(
      "landscape-sidebar-buttons-root",
    );

    const footerRoot = document.getElementById("landscape-sidebar-footer-root");

    setSidebarButtonsRoot(buttonsRoot);
    setSidebarFooterRoot(footerRoot);

    if (buttonsRoot && footerRoot) {
      onSidebarContentReady();
    }
  }, [onSidebarContentReady]);

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem(SECTION_UI_STORAGE_KEY);

      if (savedConfig) {
        setSectionUiConfig(JSON.parse(savedConfig));
      }
    } catch (error) {
      console.error(
        "Failed to load landscape section UI configuration:",
        error,
      );
    } finally {
      setSectionUiConfigLoaded(true);
    }
  }, [SECTION_UI_STORAGE_KEY]);

  useEffect(() => {
    if (!sectionUiConfigLoaded) return;

    localStorage.setItem(
      SECTION_UI_STORAGE_KEY,
      JSON.stringify(sectionUiConfig),
    );
  }, [SECTION_UI_STORAGE_KEY, sectionUiConfig, sectionUiConfigLoaded]);

  function getLandscapeSectionIcon(
    section: LandscapeVideoSection,
  ): ElementType {
    const savedIconKey = sectionUiConfig[section._id]?.iconKey;

    if (savedIconKey) {
      return LANDSCAPE_SECTION_ICON_CONFIG[savedIconKey];
    }

    const defaultIconKey =
      DEFAULT_LANDSCAPE_SECTION_ICON_KEYS[section.label] ?? "music";

    return LANDSCAPE_SECTION_ICON_CONFIG[defaultIconKey];
  }

  function handleLandscapeVideoSectionCreated({
    landscapeVideoSection,
    iconKey,
  }: {
    landscapeVideoSection: LandscapeVideoSection;
    iconKey: LandscapeSectionIconKey;
  }) {
    //scrollingToCreatedSectionRef.current = landscapeVideoSection._id;

    addLandscapeVideoSection(landscapeVideoSection);

    setSectionUiConfig((current) => ({
      ...current,
      [landscapeVideoSection._id]: {
        iconKey,
      },
    }));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
    });
  }

  function handleLandscapeVideoSectionUpdated(
    sectionId: string,
    label: string,
  ) {
    modifyLandscapeVideoSection(sectionId, {
      label,
    });
  }

  function handleLandscapeVideoSectionDeleted(sectionId: string) {
    const orderedSections = [...landscapeVideoSections].sort(
      (a, b) => a.order - b.order,
    );

    const deletedSectionIndex = orderedSections.findIndex(
      (section) => section._id === sectionId,
    );

    if (deletedSectionIndex === -1) {
      console.error(
        "Deleted landscape video section was not found in client state:",
        sectionId,
      );
      return;
    }

    const previousSectionId =
      deletedSectionIndex > 0
        ? orderedSections[deletedSectionIndex - 1]._id
        : "featured";

    const deletingLastSection =
      deletedSectionIndex === orderedSections.length - 1;

    removeLandscapeVideoSection(sectionId);

    setSectionUiConfig((current) => {
      const updatedConfig = { ...current };
      delete updatedConfig[sectionId];
      return updatedConfig;
    });

    if (activeSection === sectionId) {
      setActiveSection(previousSectionId);

      if (!deletingLastSection) {
        requestAnimationFrame(() => {
          document.getElementById(previousSectionId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
    }
  }

  function handleLandscapeVideoAdded(sectionId: string, video: LandscapeVideo) {
    addLandscapeVideo(sectionId, video);
  }

  function handleLandscapeVideoUpdated(videoId: string, video: LandscapeVideo) {
    modifyLandscapeVideo(videoId, video);
  }

  function handleLandscapeVideoDeleted(videoId: string) {
    removeLandscapeVideo(videoId);
  }

  function handleLandscapeVideoFeatured(
    videoId: string,
    video: LandscapeVideo,
  ) {
    modifyLandscapeVideo(videoId, {
      ...video,
      isFeatured: true,
    });

    requestAnimationFrame(() => {
      document.getElementById("featured")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  //Derive the featured landscape video separately
  //use the react hook's landscapeVideoBoard and/or landscapeVideoSections to derive landscapeVideos
  /* const featuredLandscapeVideo = landscapeVideos.find((video) => video.isFeatured); */

  const hasVideos = landscapeVideos.length > 0;

  const videoSectionIds = landscapeVideoSections
    .map((section) => section._id)
    .join("|");

  useEffect(() => {
    const sectionIds = [
      "featured",
      ...videoSectionIds.split("|").filter(Boolean),
    ];

    let animationFrameId: number | null = null;

    const updateActiveSection = () => {
      const sectionElements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);

      if (sectionElements.length === 0) {
        return;
      }

      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      /* if (isAtBottom) {
        const lastSection = sectionElements.at(-1);

        if (lastSection) {
          scrollingToCreatedSectionRef.current = null;

          setActiveSection((current) =>
            current === lastSection.id ? current : lastSection.id,
          );
        }

        return;
      } */

      if (isAtBottom) {
        setActiveSection(sectionElements.at(-1)!.id);
        return;
      }

      let nextActiveSectionId = sectionElements[0].id;

      for (const sectionElement of sectionElements) {
        const scrollMarginTop =
          Number.parseFloat(
            window.getComputedStyle(sectionElement).scrollMarginTop,
          ) || 0;

        const sectionTop = sectionElement.getBoundingClientRect().top;

        if (sectionTop <= scrollMarginTop + 1) {
          nextActiveSectionId = sectionElement.id;
        } else {
          break;
        }
      }

      /* setActiveSection(
        (current) => {
          const createdSectionId = scrollingToCreatedSectionRef.current;

          if (createdSectionId) {
            const currentIndex = sectionIds.indexOf(current);
            const nextIndex = sectionIds.indexOf(nextActiveSectionId);

            // Prevent a temporary backward jump, such as B → A.
            if (nextIndex < currentIndex) {
              return current;
            }
          }

          if (nextActiveSectionId === createdSectionId) {
            scrollingToCreatedSectionRef.current = null;
          }

          return current === nextActiveSectionId
            ? current
            : nextActiveSectionId;
        },
      ); */
      setActiveSection((current) =>
        current === nextActiveSectionId ? current : nextActiveSectionId,
      );
    };

    const scheduleActiveSectionUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        updateActiveSection();
      });
    };

    scheduleActiveSectionUpdate();

    window.addEventListener("scroll", scheduleActiveSectionUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleActiveSectionUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [videoSectionIds]);

  const scrollToSection = (id: string) => {
    //setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 1. Save scroll position before unload,
  // and only force top-of-page on real refresh
  useEffect(() => {
    history.scrollRestoration = "manual";

    const navEntry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;

    const isReload = navEntry?.type === "reload";

    if (!isReload) {
      sessionStorage.removeItem("videoDashboardScrollY");
    } else {
      window.scrollTo(0, 0);
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem("videoDashboardScrollY", String(window.scrollY));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 2. Restore scroll after saving scroll position and refreshing the page
  useEffect(() => {
    const savedY = sessionStorage.getItem("videoDashboardScrollY");
    if (!savedY) return;

    const timer = setTimeout(() => {
      window.scrollTo({
        top: Number(savedY),
        behavior: "smooth",
      });

      sessionStorage.removeItem("videoDashboardScrollY");
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {sidebarButtonsRoot &&
        createPortal(
          <SidebarButtons
            landscapeVideoSections={landscapeVideoSections}
            activeSection={activeSection}
            onOpenChange={setSidebarOpen}
            onScrollToSection={scrollToSection}
            onUpdated={handleLandscapeVideoSectionUpdated}
            onDeleted={handleLandscapeVideoSectionDeleted}
            getLandscapeSectionIcon={getLandscapeSectionIcon}
          />,
          sidebarButtonsRoot,
        )}

      {sidebarFooterRoot &&
        createPortal(
          <CreateLandscapeVideoSectionDialog
            landscapeVideoBoard={landscapeVideoBoard}
            open={createSectionDialogOpen}
            onOpenChange={setCreateSectionDialogOpen}
            onLandscapeVideoSectionCreated={handleLandscapeVideoSectionCreated}
          />,
          sidebarFooterRoot,
        )}

      <section className="lg:ml-10 min-w-0 space-y-10 lg:space-y-12">
        <DashboardLandscapeHeader />

        {!hasVideos && <EmptyLandscapeState />}

        <FeaturedLandscapeVideo video={featuredLandscapeVideo} />

        <div className="space-y-12 lg:space-y-14">
          {landscapeVideoSections.map((section) => (
            <DashboardLandscapeVideoSection
              key={section._id}
              section={section}
              landscapeVideoBoard={landscapeVideoBoard}
              icon={getLandscapeSectionIcon(section)}
              onLandscapeVideoAdded={handleLandscapeVideoAdded}
              onLandscapeVideoUpdated={handleLandscapeVideoUpdated}
              onLandscapeVideoDeleted={handleLandscapeVideoDeleted}
              onLandscapeVideoFeatured={handleLandscapeVideoFeatured}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function SidebarButtons({
  landscapeVideoSections,
  activeSection,
  onOpenChange,
  onScrollToSection,
  onUpdated,
  onDeleted,
  getLandscapeSectionIcon,
}: {
  landscapeVideoSections: LandscapeVideoSection[];
  activeSection: string;
  onOpenChange: (open: boolean) => void;
  onScrollToSection: (id: string) => void;
  onUpdated: (sectionId: string, label: string) => void;
  onDeleted: (sectionId: string) => void;
  getLandscapeSectionIcon: (section: LandscapeVideoSection) => ElementType;
}) {
  const handleScrollToSection = (id: string) => {
    onOpenChange(false);
    onScrollToSection(id);
  };

  return (
    <div className="w-full min-w-0 space-y-1.5 sm:space-y-2">
      <FeaturedSidebarButton
        activeSection={activeSection}
        onClick={handleScrollToSection}
      />

      {landscapeVideoSections.map((section) => (
        <SidebarButton
          key={section._id}
          id={section._id}
          label={section.label}
          icon={getLandscapeSectionIcon(section)}
          activeSection={activeSection}
          onClick={handleScrollToSection}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      ))}
    </div>
  );
}

function DashboardContentFallback() {
  return (
    <div
      aria-hidden="true"
      className="
        lg:ml-10
        min-h-[60vh] animate-pulse
        rounded-2xl bg-white/10
        sm:rounded-3xl
      "
    />
  );
}

function DashboardLandscapeHeader() {
  return (
    <header
      className="
        flex min-w-0 flex-col justify-between
        gap-5 rounded-2xl
        border border-amber-400/15
        bg-black/40 p-4
        shadow-[0_0_18px_rgba(245,158,11,0.12)]
        backdrop-blur-md
        sm:gap-6 sm:rounded-3xl sm:p-6
        lg:flex-row lg:items-end lg:p-8
      "
    >
      <div className="flex flex-col min-w-0 max-w-4xl space-y-3 sm:space-y-4 items-center text-center sm:items-start sm:text-start">
        <h1
          className="
            break-words font-marcellus
            text-4xl leading-none text-amber-300
            sm:text-5xl
            lg:text-6xl
          "
        >
          Videos
        </h1>

        <p
          className="
            max-w-3xl break-words
            text-sm leading-6 text-gray-300
            sm:text-base sm:leading-7
            lg:text-lg lg:leading-8
          "
        >
          Manage Youtube videos, covers, performances, tutorials, and
          Highlights.
        </p>
      </div>

      <Button
        asChild
        className="
          group relative h-10 w-full
          cursor-pointer overflow-hidden
          rounded-2xl bg-amber-400
          px-3 text-sm font-bold text-black
          shadow-[0_0_14px_rgba(245,158,11,0.35)]
          transition-shadow duration-300
          hover:shadow-[0_0_22px_rgba(245,158,11,0.6)]
          sm:h-11 sm:w-fit sm:px-5 sm:text-base
          lg:text-xl
        "
      >
        <Link href="/dashboard-portrait-videos" className="min-w-0">
          <span
            className="
              absolute inset-0 origin-right bg-amber-600
              transition-transform duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-x-0 active:bg-amber-400
            "
          />

          <span className="relative z-10 flex min-w-0 items-center justify-center gap-2">
            <Smartphone className="h-4 w-4 shrink-0 [stroke-width:3]" />

            <span className="truncate">Manage Shorts</span>
          </span>
        </Link>
      </Button>
    </header>
  );
}

function EmptyLandscapeState() {
  return (
    <section
      className="
        min-w-0 rounded-2xl
        border border-amber-400/15
        bg-black/40 p-5
        shadow-[0_0_18px_rgba(245,158,11,0.12)]
        backdrop-blur-md
        sm:rounded-3xl sm:p-8
        lg:p-10
      "
    >
      <div className="mx-auto flex min-w-0 max-w-xl flex-col items-center text-center">
        <div
          className="
            mb-4 rounded-full
            border border-white/10
            bg-white/10 p-4
            sm:mb-5 sm:p-5
          "
        >
          <FaYoutube className="h-9 w-9 text-red-500 sm:h-12 sm:w-12" />
        </div>

        <h2
          className="
            max-w-full break-words
            font-marcellus text-2xl
            leading-tight text-white
            sm:text-3xl
            lg:text-4xl
          "
        >
          No landscape videos yet
        </h2>

        <p
          className="
            mt-3 max-w-full break-words
            text-sm leading-6 text-gray-300
            sm:text-base sm:leading-7
          "
        >
          {/* Upload your first long-form video or add a YouTube embed. */}
          Upload your first Youtube Video.
        </p>
      </div>
    </section>
  );
}
