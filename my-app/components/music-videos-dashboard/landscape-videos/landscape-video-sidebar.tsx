import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  deleteLandscapeVideoSection,
  updateLandscapeVideoSection,
} from "@/lib/actions/landscape-video-sections";
import {
  ArrowUp,
  ChevronRight,
  Edit3,
  EllipsisVertical,
  Loader2,
  PanelLeft,
  Star,
  Trash2,
} from "lucide-react";
import { useEffect, useState, type ElementType } from "react";

type LandscapeVideoSidebarShellProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScrollToTop: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function LandscapeVideoSidebarShell({
  open,
  onOpenChange,
  onScrollToTop,
  children,
  footer,
}: LandscapeVideoSidebarShellProps) {
  const handleScrollToTop = () => {
    onOpenChange(false);
    onScrollToTop();
  };

  return (
    <aside
      className="pointer-events-none
                  fixed left-2 top-24 z-40
                  sm:left-4 sm:top-28
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
          rounded-2xl
          sm:rounded-3xl
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
          lg:w-68
          lg:max-w-68
          lg:pointer-events-auto
          lg:opacity-100
        `}
      >
        <Card
          className="
              max-h-[calc(100svh-12rem)]
              overflow-hidden
              border-amber-400/20 bg-black/85
              shadow-[0_0_18px_rgba(245,158,11,0.5)]
              backdrop-blur-md
              lg:bg-black/45
            "
        >
          <CardContent
            className="
                flex min-h-0 flex-col gap-6 p-3
                sm:gap-8 sm:p-4
              "
          >
            <div className="flex shrink-0 justify-center">
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
                      group-hover:scale-y-0 active:transition-none active:bg-amber-400
                    "
                />

                <span className="relative z-10 flex min-w-0 items-center justify-center gap-2">
                  <ArrowUp className="h-4 w-4 shrink-0" />
                  <span className="truncate">Back to Top</span>
                </span>
              </Button>
            </div>

            <nav className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 sm:gap-6">
              <p
                className="
                    shrink-0 break-words text-center
                    font-marcellus text-2xl
                    tracking-wide text-gray-100
                    sm:text-3xl
                    lg:text-4xl
                  "
              >
                Sections
              </p>

              <div
                className="
                    min-h-0 min-w-0 flex-1
                    overflow-x-hidden overflow-y-auto py-4
                    pr-1 
                  "
              >
                {children}
              </div>

              {footer && <div className="shrink-0">{footer}</div>}
            </nav>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}

export function FeaturedSidebarButton({
  activeSection,
  onClick,
}: {
  activeSection: string;
  onClick: (id: string) => void;
}) {
  const id = "featured";
  const isActive = activeSection === id;

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`
        flex w-full min-w-0
        cursor-pointer items-center
        gap-2 rounded-xl
        px-2.5 py-2.5
        text-left text-sm
        transition-all duration-300

        sm:gap-3
        sm:rounded-2xl
        sm:px-3
        sm:py-3
        sm:text-base

        lg:text-lg

        ${
          isActive
            ? `
                bg-gradient-to-r
                from-amber-300 via-amber-400 to-orange-500
                text-black
                shadow-[0_0_16px_rgba(245,158,11,0.45)]
              `
            : `
                text-gray-300
                hover:bg-white/10
                hover:text-amber-200
                hover:shadow-[0_0_14px_rgba(245,158,11,0.18)]
                active:bg-white/10
                active:text-amber-200
                active:transition-none
              `
        }
      `}
    >
      <Star
        className={`
          h-4 w-4 shrink-0
          sm:h-5 sm:w-5

          ${isActive ? "text-black" : "text-amber-300"}
        `}
      />

      <span className="min-w-0 flex-1 break-words font-marcellus leading-tight">
        Featured
      </span>
    </button>
  );
}

export function SidebarButton({
  id,
  label,
  icon: Icon,
  activeSection,
  onClick,
  allowDelete = true,
  onUpdated,
  onDeleted,
}: {
  id: string;
  label: string;
  icon: ElementType;
  activeSection: string;
  onClick: (id: string) => void;
  allowDelete?: boolean;
  onUpdated?: (sectionId: string, label: string) => void;
  onDeleted: (sectionId: string) => void;
}) {
  const isActive = activeSection === id;

  const [displayLabel, setDisplayLabel] = useState(label);
  const [draftLabel, setDraftLabel] = useState(label);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  function startEditing() {
    setDraftLabel(displayLabel);
    setUpdateError(null);
    setEditing(true);
  }

  async function saveLabel() {
    const trimmedLabel = draftLabel.trim();

    if (!trimmedLabel) {
      setDraftLabel(displayLabel);
      setEditing(false);
      return;
    }

    if (trimmedLabel === displayLabel) {
      setUpdateError(null);
      setEditing(false);
      return;
    }

    setUpdating(true);
    setUpdateError(null);

    try {
      const result = await updateLandscapeVideoSection(id, {
        label: trimmedLabel,
      });

      if (result?.error) {
        setUpdateError(result.error);
        return;
      }

      setDisplayLabel(trimmedLabel);
      onUpdated?.(id, trimmedLabel);
      setEditing(false);
    } catch (error) {
      console.error(error);
      setUpdateError("Something went wrong while updating the section.");
    } finally {
      setUpdating(false);
    }
  }

  function cancelEditing() {
    if (updating) return;
    setDraftLabel(displayLabel);
    setUpdateError(null);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="space-y-1.5">
        <div
          className={`flex w-full min-w-0
                        items-center gap-2
                        rounded-xl px-2.5 py-2
                        sm:gap-3 sm:rounded-2xl
                        sm:px-3 sm:py-2.5
        
                        ${
                          isActive
                            ? `bg-gradient-to-r from-amber-300
                                      via-amber-400 to-orange-500
                                      shadow-[0_0_16px_rgba(245,158,11,0.45)]`
                            : `border border-amber-300/20
                                      bg-white/10`
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
          <input
            autoFocus
            disabled={updating}
            type="text"
            value={draftLabel}
            maxLength={15}
            autoComplete="off"
            placeholder={displayLabel}
            aria-label={`Rename ${displayLabel}`}
            aria-invalid={Boolean(updateError)}
            aria-describedby={
              updateError ? `section-update-error-${id}` : undefined
            }
            onChange={(e) => {
              setDraftLabel(e.target.value);
              if (updateError) {
                setUpdateError(null);
              }
            }}
            onBlur={cancelEditing}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                e.preventDefault();
                void saveLabel();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                cancelEditing();
              }
            }}
            className={`h-8 min-w-0 flex-1
                        rounded-lg border px-2
                        font-marcellus text-sm
                        outline-none transition-all duration-200
                        focus:ring-1 focus:ring-amber-300/50
                        sm:h-9 sm:text-base lg:text-lg

                        ${
                          updateError
                            ? "border-red-400 focus:ring-red-400/50"
                            : isActive
                              ? `
                                  border-black/20 bg-black/15
                                  text-black placeholder:text-black/50
                                `
                              : `
                                  border-amber-300/25 bg-black/50
                                  text-gray-100 placeholder:text-gray-500
                                `
                        }
        
                        ${updating ? "cursor-wait opacity-70" : ""}
                        `}
          />
        </div>
        {updateError && (
          <p
            id={`section-update-error-${id}`}
            role="alert"
            className="px-2 text-xs text-red-300 sm:px-3 sm:text-sm"
          >
            {updateError}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`group/section
                    flex w-full min-w-0
                    overflow-hidden
                    items-center
                    rounded-xl
                    transition-colors duration-300
                    sm:rounded-2xl
                    ${
                      isActive
                        ? `
                            bg-gradient-to-r
                            from-amber-300 via-amber-400 to-orange-500
                            text-black
                            shadow-[0_0_16px_rgba(245,158,11,0.45)]
                          `
                        : `
                            text-gray-300
                            hover:bg-white/10 active:transition-none active:bg-white/10
                            hover:text-amber-200 active:text-amber-200
                            hover:shadow-[0_0_14px_rgba(245,158,11,0.18)]
                          `
                    }`}
    >
      <button
        type="button"
        onClick={() => onClick(id)}
        className="flex min-w-0 flex-1
                         cursor-pointer items-center
                         gap-2
                         px-2.5 py-2.5
                         text-left text-sm
                         sm:gap-3
                         sm:px-3 sm:py-3 sm:text-base
                         lg:text-lg"
      >
        <Icon
          className={`
            h-4 w-4 shrink-0
            sm:h-5 sm:w-5

            ${isActive ? "text-black" : "text-amber-300"}
          `}
        />
        <span className="min-w-0 flex-1 break-words font-marcellus leading-tight">
          {displayLabel}
        </span>
      </button>

      <SidebarSectionMenu
        sectionId={id}
        label={displayLabel}
        isActive={isActive}
        onEdit={startEditing}
        allowDelete={allowDelete}
        onDeleted={onDeleted}
      />
    </div>
  );
}

function SidebarSectionMenu({
  sectionId,
  label,
  isActive,
  onEdit,
  onDeleted,
}: {
  sectionId: string;
  label: string;
  isActive: boolean;
  onEdit: () => void;
  allowDelete?: boolean;
  onDeleted: (sectionId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeMenu = () => {
      setOpen(false);
    };

    // Capture phase detects scrolling from window and nested scroll containers.
    window.addEventListener("scroll", closeMenu, true);

    return () => {
      window.removeEventListener("scroll", closeMenu, true);
    };
  }, [open]);

  async function handleDelete() {
    if (deleting) return;

    setDeleting(true);

    try {
      const result = await deleteLandscapeVideoSection(sectionId);

      if (!result.error) {
        setOpen(false);
        onDeleted(sectionId);
        return;
      }

      console.error("Failed to delete landscape video section:", result.error);
    } catch (error) {
      console.error("Failed to delete landscape video section:", error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Open options for ${label}`}
          disabled={deleting}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`
              mr-1 flex h-8 w-8 shrink-0
              cursor-pointer items-center justify-center
              rounded-full
              transition-all duration-300

              active:transition-none
              disabled:cursor-not-allowed
              disabled:opacity-60

              data-[state=open]:shadow-[0_0_14px_rgba(245,158,11,0.4)]

              ${
                isActive
                  ? `
                    text-black
                    hover:bg-black/15
                    active:bg-black/15
                    data-[state=open]:bg-black/15
                  `
                  : `
                    text-gray-300
                    hover:bg-amber-400/80
                    hover:text-black
                    active:bg-amber-400/80
                    active:text-black
                    data-[state=open]:bg-amber-400/80
                    data-[state=open]:text-black
                  `
              }

              sm:mr-1.5
              sm:h-9 sm:w-9
            `}
        >
          {deleting ? (
            <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
          ) : (
            <EllipsisVertical className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        collisionPadding={12}
        className="
            w-[calc(100vw-2rem)]
            max-w-60
            rounded-2xl
            border border-amber-300/20
            bg-neutral-950/95
            p-1.5
            font-redHatDisplay
            text-gray-100
            shadow-[0_0_24px_rgba(245,158,11,0.28)]
            backdrop-blur-xl

            sm:rounded-3xl
            sm:p-2
          "
      >
        <DropdownMenuItem
          disabled={deleting}
          onSelect={onEdit}
          className="
              group cursor-pointer
              rounded-xl
              px-3 py-2.5
              text-sm font-medium
              transition-colors duration-200

              focus:bg-amber-400/80 active:transition-none active:bg-amber-400/80
              focus:text-black active:text-black

              sm:rounded-2xl
              sm:py-3
              sm:text-base
            "
        >
          <Edit3
            className="
                mr-2 h-4 w-4 shrink-0
                text-amber-300
                transition-transform duration-300

                group-hover:rotate-6
                group-focus:text-black

                sm:mr-3
                sm:h-5 sm:w-5
              "
          />

          <span className="min-w-0 truncate">Edit Section Name</span>
        </DropdownMenuItem>

        <div className="my-1 h-px bg-white/10" />

        <DropdownMenuItem
          disabled={deleting}
          onSelect={() => {
            void handleDelete();
          }}
          className="
              group cursor-pointer
              rounded-xl
              px-3 py-2.5
              text-sm font-medium
              text-red-300
              transition-colors duration-200

              focus:bg-red-600/80 active:transition-none active:bg-red-600/80
              focus:text-white active:text-white

              disabled:cursor-not-allowed
              disabled:opacity-60

              sm:rounded-2xl
              sm:py-3
              sm:text-base
            "
        >
          {deleting ? (
            <Loader2
              className="
                mr-2 h-4 w-4 shrink-0 animate-spin
                sm:mr-3 sm:h-5 sm:w-5
              "
            />
          ) : (
            <Trash2
              className="
                mr-2 h-4 w-4 shrink-0
                transition-transform duration-300

                group-hover:scale-110

                sm:mr-3
                sm:h-5 sm:w-5
              "
            />
          )}

          <span className="min-w-0 truncate">
            {deleting ? "Deleting..." : "Delete Section"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SidebarButtonsFallback({
  sectionCount = 5,
}: {
  sectionCount?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative w-full min-w-0 space-y-1.5 sm:space-y-2"
    >
      {/* Match the initially active FeaturedSidebarButton exactly */}
      <div
        className="
          flex w-full min-w-0
          items-center gap-2
          rounded-xl
          bg-gradient-to-r
          from-amber-300 via-amber-400 to-orange-500
          px-2.5 py-2.5
          text-left text-sm text-black
          shadow-[0_0_16px_rgba(245,158,11,0.45)]

          sm:gap-3
          sm:rounded-2xl
          sm:px-3 sm:py-3
          sm:text-base

          lg:text-lg
        "
      >
        <Star
          className="
            h-4 w-4 shrink-0 text-black
            sm:h-5 sm:w-5
          "
        />

        <span
          className="
            min-w-0 flex-1
            font-marcellus leading-tight
          "
        >
          Featured
        </span>
      </div>

      {Array.from({ length: sectionCount }).map((_, index) => (
        <div
          key={index}
          className="
              flex w-full min-w-0
              items-center overflow-hidden
              rounded-xl text-gray-300
              sm:rounded-2xl
            "
        >
          {/* Exact footprint of the real section button */}
          <div
            className="
                flex min-w-0 flex-1
                items-center gap-2
                px-2.5 py-2.5
                text-left text-sm

                sm:gap-3
                sm:px-3 sm:py-3
                sm:text-base

                lg:text-lg
              "
          >
            {/* Exact icon dimensions */}
            <div
              className="
                  h-4 w-4 shrink-0
                  animate-pulse rounded
                  bg-neutral-600/80

                  sm:h-5 sm:w-5
                "
            />

            {/* Uses the same font sizing and line height as the real label */}
            <div
              className="
                  min-w-0 flex-1
                  font-marcellus leading-tight
                "
            >
              <div
                className={`
                    h-[1.25em] animate-pulse
                    rounded bg-neutral-600/80
                    w-3/4
                  `}
              />
            </div>
          </div>

          {/* Exact SidebarSectionMenu footprint */}
          <div
            className="
                mr-1 flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-full

                sm:mr-1.5
                sm:h-9 sm:w-9
              "
          >
            <EllipsisVertical
              className="
                  h-4 w-4 text-gray-600
                  sm:h-5 sm:w-5
                "
            />
          </div>
        </div>
      ))}
    </div>
  );
}
