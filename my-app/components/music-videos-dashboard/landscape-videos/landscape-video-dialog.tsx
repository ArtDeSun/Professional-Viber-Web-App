"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  createLandscapeVideo,
  updateLandscapeVideo,
} from "@/lib/actions/landscape-videos";
import type {
  LandscapeVideo,
  LandscapeVideoBoard,
  LandscapeVideoSection,
} from "@/lib/models/models.types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

type LandscapeVideoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  landscapeVideoBoard: LandscapeVideoBoard;
  section: LandscapeVideoSection;
  video?: LandscapeVideo | null;
  onSaved: (sectionId: string, video: LandscapeVideo) => void;
};

export default function LandscapeVideoDialog({
  open,
  onOpenChange,
  landscapeVideoBoard,
  section,
  video = null,
  onSaved,
}: LandscapeVideoDialogProps) {
  const editing = Boolean(video);

  const [title, setTitle] = useState(video?.title ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(video?.youtubeUrl ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    setTitle(video?.title ?? "");
    setYoutubeUrl(video?.youtubeUrl ?? "");
    setSubmitting(false);
    setError(null);
  }, [open, video]);

  function handleOpenChange(nextOpen: boolean) {
    if (submitting) return;

    onOpenChange(nextOpen);

    if (!nextOpen) {
      setError(null);
    }
  }

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedUrl = youtubeUrl.trim();

    if (!trimmedTitle) {
      setError("Enter a video title.");
      return;
    }

    if (!trimmedUrl) {
      setError("Enter a YouTube URL.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result =
        editing && video
          ? await updateLandscapeVideo(video._id, {
              title: trimmedTitle,
              youtubeUrl: trimmedUrl,
            })
          : await createLandscapeVideo({
              landscapeVideoBoardId: landscapeVideoBoard._id,
              landscapeVideoSectionId: section._id,
              title: trimmedTitle,
              youtubeUrl: trimmedUrl,
            });

      if ("error" in result) {
        setError(result.error ?? "Failed to save the video.");
        setSubmitting(false);
        return;
      }

      onSaved(section._id, result.data);

      // Keep submitting=true during the closing animation.
    } catch (error) {
      console.error(error);
      setError("Something went wrong while saving the video.");
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal={false}>
      <DialogContent
        onFocusOutside={(event) => {
          event.preventDefault();
        }}
        onPointerDownOutside={(event) => {
          event.preventDefault();

          if (!submitting) {
            handleOpenChange(false);
          }
        }}
        className="
          data-[state=closed]:animate-none
          data-[state=closed]:duration-0

          w-[calc(100vw-4rem)] max-w-xl
          overflow-hidden rounded-2xl
          border border-amber-400/20
          bg-neutral-950/95 p-0
          text-gray-100
          shadow-[0_0_32px_rgba(245,158,11,0.28)]
          backdrop-blur-xl
          sm:w-full sm:rounded-3xl
        "
      >
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-x-0 top-0
            h-24 bg-gradient-to-b
            from-amber-400/10 to-transparent
          "
        />

        <DialogHeader
          className="
            relative border-b border-white/10
            px-4 pb-4 pt-5 text-left
            sm:px-6 sm:pb-5 sm:pt-6
          "
        >
          <DialogTitle
            className="
              flex items-center gap-3
              font-marcellus text-2xl text-amber-200
              sm:text-3xl
            "
          >
            <FaYoutube className="shrink-0 text-red-500" />
            {editing ? "Edit video" : "Add YouTube video"}
          </DialogTitle>

          <p className="text-sm leading-6 text-gray-400 sm:text-base">
            {editing
              ? "Update the title or replace the YouTube link."
              : "YouTube provides the thumbnail and duration automatically."}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div
            className="
              max-h-[70dvh] space-y-6
              overflow-y-auto px-4 py-5
              sm:space-y-7 sm:px-6 sm:py-6
            "
          >
            <div className="space-y-2">
              <label
                htmlFor={`landscape-video-title-${section._id}`}
                className="
                  block font-marcellus
                  text-base text-gray-100
                  sm:text-lg
                "
              >
                Video title
              </label>

              <Input
                id={`landscape-video-title-${section._id}`}
                value={title}
                maxLength={20}
                disabled={submitting}
                autoComplete="off"
                placeholder={editing ? "Update video title" : "New video title"}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setError(null);
                }}
                className="
                  h-11 rounded-xl
                  border-amber-300/20 bg-black/40
                  px-3 font-redHatDisplay
                  text-sm text-gray-100
                  placeholder:text-gray-500
                  focus-visible:border-amber-300/50
                  focus-visible:ring-2
                  focus-visible:ring-amber-300/20
                  sm:h-12 sm:rounded-2xl
                  sm:px-4 sm:text-base
                "
              />

              <div className="flex justify-end">
                <span className="text-xs text-gray-500 sm:text-sm">
                  {title.length}/20
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`landscape-video-url-${section._id}`}
                className="
                  block font-marcellus
                  text-base text-gray-100
                  sm:text-lg
                "
              >
                YouTube URL
              </label>

              <Input
                id={`landscape-video-url-${section._id}`}
                type="url"
                value={youtubeUrl}
                disabled={submitting}
                autoComplete="url"
                inputMode="url"
                placeholder="https://www.youtube.com/watch?v=..."
                onChange={(event) => {
                  setYoutubeUrl(event.target.value);
                  setError(null);
                }}
                className="
                  h-11 rounded-xl
                  border-amber-300/20 bg-black/40
                  px-3 font-redHatDisplay
                  text-sm text-gray-100
                  placeholder:text-gray-500
                  focus-visible:border-amber-300/50
                  focus-visible:ring-2
                  focus-visible:ring-amber-300/20
                  sm:h-12 sm:rounded-2xl
                  sm:px-4 sm:text-base
                "
              />

              <p className="min-h-5 text-xs text-red-300 sm:text-sm">{error}</p>
            </div>
          </div>

          <DialogFooter
            className="
              mx-1 my-1 flex-row gap-4
              border-t border-white/10
              bg-black/20 px-4 py-4
              sm:justify-between sm:gap-6
              sm:px-6 sm:py-5
            "
          >
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => handleOpenChange(false)}
              className="
                h-10 flex-1 cursor-pointer rounded-xl
                border-white/15 bg-white/5
                text-gray-200
                hover:bg-white/10 hover:text-red-400
                sm:h-11 sm:flex-none sm:rounded-2xl
                sm:px-5 sm:text-base
              "
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={submitting || !title.trim() || !youtubeUrl.trim()}
              className="
                h-10 flex-1 cursor-pointer rounded-xl
                bg-amber-500 px-4
                font-bold text-neutral-900
                shadow-[0_0_14px_rgba(245,158,11,0.3)]
                hover:bg-amber-400
                sm:h-11 sm:flex-none sm:rounded-2xl
                sm:px-5 sm:text-base
              "
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              {submitting
                ? editing
                  ? "Saving..."
                  : "Verifying..."
                : editing
                  ? "Save Changes"
                  : "Add Video"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
