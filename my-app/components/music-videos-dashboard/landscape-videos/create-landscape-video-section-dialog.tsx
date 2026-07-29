"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createLandscapeVideoSection } from "@/lib/actions/landscape-video-sections";
import type {
  LandscapeVideoBoard,
  LandscapeVideoSection,
} from "@/lib/models/models.types";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Mic,
  Music,
  Plus,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { LandscapeSectionIconKey } from "./landscape-video-section-ui-config";

interface CreateLandscapeVideoSectionDialogProps {
  landscapeVideoBoard: LandscapeVideoBoard;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLandscapeVideoSectionCreated?: (data: {
    landscapeVideoSection: LandscapeVideoSection;
    iconKey: LandscapeSectionIconKey;
  }) => void;
}

const INITIAL_FORM_DATA: {
  label: string;
  iconKey: LandscapeSectionIconKey;
} = {
  label: "",
  iconKey: "music",
};

const ICON_OPTIONS = [
  { key: "calendar", Icon: Calendar },
  { key: "check", Icon: CheckCircle2 },
  { key: "mic", Icon: Mic },
  { key: "award", Icon: Award },
  { key: "x", Icon: XCircle },
  { key: "music", Icon: Music },
  { key: "briefcase", Icon: Briefcase },
  { key: "star", Icon: Star },
  { key: "clock", Icon: Clock },
  { key: "flame", Icon: Flame },
] satisfies {
  key: LandscapeSectionIconKey;
  Icon: typeof Calendar;
}[];

export default function CreateLandscapeVideoSectionDialog({
  landscapeVideoBoard,
  open,
  onOpenChange,
  onLandscapeVideoSectionCreated,
}: CreateLandscapeVideoSectionDialogProps) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetForm() {
    setFormData(INITIAL_FORM_DATA);
    setError(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetForm();
    }
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const trimmedLabel = formData.label.trim();

    if (!trimmedLabel) {
      setError("Please enter a section label.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result = await createLandscapeVideoSection({
        landscapeVideoBoardId: landscapeVideoBoard._id,
        label: trimmedLabel,
      });

      if (!result.error && result.data) {
        onLandscapeVideoSectionCreated?.({
          landscapeVideoSection: result.data,
          iconKey: formData.iconKey,
        });

        resetForm();
        onOpenChange(false);
      } else {
        setError(result.error ?? "Failed to create the section.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong while creating the section.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal={false}>
      <DialogTrigger asChild>
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
            hover:bg-white/10
            hover:text-amber-200
            hover:shadow-[0_0_12px_rgba(245,158,11,0.18)]

            active:bg-white/10
            active:text-amber-200
            active:transition-none

            sm:h-10
            sm:text-lg
          "
        >
          <Plus className="h-4 w-4 shrink-0" />
          <span className="truncate">Add Section</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          w-[calc(100vw-1.5rem)]
          max-w-xl
          overflow-hidden
          rounded-2xl
          border border-amber-400/20
          bg-neutral-950/95
          p-0
          text-gray-100
          shadow-[0_0_32px_rgba(245,158,11,0.28)]
          backdrop-blur-xl

          sm:w-full
          sm:rounded-3xl
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-x-0 top-0
            h-24
            bg-gradient-to-b
            from-amber-400/10
            to-transparent
          "
        />

        <DialogHeader
          className="
            relative
            border-b border-white/10
            px-4 pb-4 pt-5
            text-left

            sm:px-6
            sm:pb-5
            sm:pt-6
          "
        >
          <DialogTitle
            className="
              font-marcellus
              text-2xl text-amber-200

              sm:text-3xl
            "
          >
            Add a new section
          </DialogTitle>

          <p
            className="
              text-sm leading-6 text-gray-400

              sm:text-base
            "
          >
            Create a label and choose an icon for the new video section.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div
            className="
              max-h-[70dvh]
              space-y-6
              overflow-x-hidden
              overflow-y-auto
              px-4 py-5

              sm:space-y-8
              sm:px-6
              sm:py-6
            "
          >
            <div className="space-y-2">
              <label
                htmlFor="landscape-video-section-label"
                className="
                  block
                  font-marcellus
                  text-base text-gray-100

                  sm:text-lg
                "
              >
                Section label
              </label>

              <Input
                id="landscape-video-section-label"
                value={formData.label}
                maxLength={15}
                autoComplete="off"
                placeholder="New Section"
                disabled={submitting}
                onChange={(e) => {
                  setFormData((current) => ({
                    ...current,
                    label: e.target.value,
                  }));

                  if (error) {
                    setError(null);
                  }
                }}
                className="
                  h-11
                  rounded-xl
                  border-amber-300/20
                  bg-black/40
                  px-3
                  font-redHatDisplay
                  text-sm text-gray-100
                  placeholder:text-gray-500

                  focus-visible:border-amber-300/50
                  focus-visible:ring-2
                  focus-visible:ring-amber-300/20

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  sm:h-12
                  sm:rounded-2xl
                  sm:px-4
                  sm:text-base
                "
              />

              <div className="flex items-start justify-between gap-3">
                <p className="min-h-5 text-xs text-red-300 sm:text-sm">
                  {error}
                </p>

                <span className="shrink-0 text-xs text-gray-500 sm:text-sm">
                  {formData.label.length}/15
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p
                className="
                  font-marcellus
                  text-base text-gray-100

                  sm:text-lg
                "
              >
                Section icon
              </p>

              <div
                className="
                  grid grid-cols-5
                  gap-2

                  sm:gap-3
                "
              >
                {ICON_OPTIONS.map(({ key, Icon }) => {
                  const selected = formData.iconKey === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      aria-label={`Use ${key} icon`}
                      aria-pressed={selected}
                      disabled={submitting}
                      onClick={() =>
                        setFormData((current) => ({
                          ...current,
                          iconKey: key,
                        }))
                      }
                      className={`
                        flex aspect-square min-w-0
                        cursor-pointer items-center justify-center
                        rounded-xl
                        border
                        transition-all duration-100

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-amber-300/50
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-neutral-950

                        disabled:cursor-not-allowed
                        disabled:opacity-60

                        sm:rounded-2xl

                        ${
                          selected
                            ? `
                              border-amber-300/60
                              bg-amber-400
                              text-black
                            `
                            : `
                              border-white/10
                              bg-white/5
                              text-amber-300

                              hover:border-amber-300/30
                              hover:bg-amber-400/10
                              hover:text-amber-200

                              active:bg-amber-400/10
                              active:transition-none
                            `
                        }
                      `}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <DialogFooter
            className="
              mx-1 my-1
              flex-row
              gap-4
              border-t border-white/10
              bg-black/20
              px-4 py-4

              sm:justify-between
              sm:gap-6
              sm:px-6
              sm:py-5
            "
          >
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => handleOpenChange(false)}
              className="
                h-10 flex-1
                cursor-pointer
                rounded-xl
                border-white/15
                bg-white/5
                text-sm text-gray-200
                transition-all duration-100

                hover:bg-white/10
                hover:text-red-500/80

                active:bg-white/10
                active:transition-none

                disabled:cursor-not-allowed
                disabled:opacity-60

                sm:h-11
                sm:flex-none
                sm:rounded-2xl
                sm:px-5
                sm:text-base
              "
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={submitting || !formData.label.trim()}
              className="
                h-10 flex-1
                cursor-pointer
                rounded-xl
                bg-amber-500
                px-4
                text-sm font-bold text-neutral-800
                shadow-[0_0_14px_rgba(245,158,11,0.3)]
                transition-all duration-100

                hover:bg-amber-600
                hover:text-black

                active:bg-amber-600
                active:text-black
                active:transition-none

                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:translate-y-0
                disabled:hover:bg-amber-600

                sm:h-11
                sm:flex-none
                sm:rounded-2xl
                sm:px-5
                sm:text-base
              "
            >
              {submitting ? "Adding..." : "Add Section"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
