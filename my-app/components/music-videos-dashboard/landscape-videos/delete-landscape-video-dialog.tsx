"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteLandscapeVideo } from "@/lib/actions/landscape-videos";
import type { LandscapeVideo } from "@/lib/models/models.types";
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type DeleteLandscapeVideoDialogProps = {
  video: LandscapeVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: (videoId: string) => void;
};

export default function DeleteLandscapeVideoDialog({
  video,
  open,
  onOpenChange,
  onDeleted,
}: DeleteLandscapeVideoDialogProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setDeleting(false);
      setError(null);
    }
  }, [open]);

  async function handleDelete() {
    if (!video || deleting) return;

    setDeleting(true);
    setError(null);

    try {
      const result = await deleteLandscapeVideo(video._id);

      if ("error" in result) {
        setError(result.error ?? "Failed to delete the video.");
        setDeleting(false);
        return;
      }

      onDeleted(video._id);

      // Do not set deleting back to false here.
      // Keep "Deleting..." during the closing animation.
    } catch (error) {
      console.error(error);
      setError("Failed to delete the video.");
      setDeleting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!deleting) onOpenChange(nextOpen);
      }}
      modal={false}
    >
      <DialogContent
        onFocusOutside={(event) => {
          event.preventDefault();
        }}
        onPointerDownOutside={(event) => {
          event.preventDefault();

          if (!deleting) {
            onOpenChange(false);
          }
        }}
        className="
          data-[state=closed]:animate-none
          data-[state=closed]:duration-0

          w-[calc(100vw-4rem)] max-w-md
          rounded-2xl border border-red-400/20
          bg-neutral-950/95 p-0
          text-gray-100
          shadow-[0_0_32px_rgba(239,68,68,0.2)]
          backdrop-blur-xl
          sm:w-full sm:rounded-3xl
        "
      >
        <DialogHeader
          className="
            border-b border-white/10
            px-4 pb-4 pt-5 text-left
            sm:px-6 sm:pb-5 sm:pt-6
          "
        >
          <DialogTitle
            className="
              flex items-center gap-3
              font-marcellus text-2xl text-red-300
            "
          >
            <Trash2 className="h-6 w-6" />
            Delete video
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 px-4 py-5 sm:px-6">
          <p className="text-sm leading-6 text-gray-300 sm:text-base">
            Delete{" "}
            <span className="font-semibold text-white">{video?.title}</span>?
            This cannot be undone.
          </p>

          <p className="min-h-5 text-sm text-red-300">{error}</p>
        </div>

        <DialogFooter
          className="
            mx-1 my-1 flex-row gap-4
            border-t border-white/10
            bg-black/20 px-4 py-4
            sm:justify-between sm:px-6 sm:py-5
          "
        >
          <Button
            type="button"
            variant="outline"
            disabled={deleting}
            onClick={() => {
              setError(null);
              onOpenChange(false);
            }}
            className="
              h-10 flex-1 rounded-xl
              border-white/15 bg-white/5
              sm:flex-none sm:rounded-2xl sm:px-5
              hover:bg-white/10 hover:text-red-400
              cursor-pointer
            "
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            className="
              h-10 flex-1 rounded-xl
              bg-red-700 text-white
              hover:bg-red-600
              sm:flex-none sm:rounded-2xl sm:px-5
              cursor-pointer
            "
          >
            {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {deleting ? "Deleting..." : "Delete Video"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
