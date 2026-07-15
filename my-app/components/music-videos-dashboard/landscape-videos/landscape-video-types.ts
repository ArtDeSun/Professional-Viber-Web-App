import type { ElementType } from "react";

export type LandscapeVideo = {
  id: string;
  title: string;
  sourceType: "youtube" | "upload";
  youtubeUrl?: string;
  thumbnailUrl?: string;
  youtubeEmbedUrl?: string;
  duration?: string;
  uploadedAt?: string;
};

export type LandscapeVideoSectionData = {
  id: string;
  label: string;
  icon: ElementType;
  videos: LandscapeVideo[];
};

export type ExtractedYoutubeMetadata = {
  title: string;
  duration: string;
  uploadedAt: string;
  thumbnailUrl: string;
  youtubeEmbedUrl: string;
};
