"use server";

import mongoose from "mongoose";
import { updateTag } from "next/cache";

import { getSession } from "../auth/auth";
import connectDB from "../db";
import {
  LandscapeVideo,
  LandscapeVideoBoard,
  LandscapeVideoSection,
} from "../models";
import type { LandscapeVideo as LandscapeVideoType } from "../models/models.types";

type LandscapeVideoActionResult =
  | {
      data: LandscapeVideoType;
      error?: never;
    }
  | {
      data?: never;
      error: string;
    };

type CreateLandscapeVideoInput = {
  landscapeVideoBoardId: string;
  landscapeVideoSectionId: string;
  title: string;
  youtubeUrl: string;
};

type UpdateLandscapeVideoInput = {
  title: string;
  youtubeUrl: string;
};

type YouTubeVideoMetadata = {
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  thumbnailUrl: string;
  duration: string;
};

function serializeLandscapeVideo(video: unknown): LandscapeVideoType {
  return JSON.parse(JSON.stringify(video)) as LandscapeVideoType;
}

function normalizeTitle(title: string): string {
  return title.trim().replace(/\s+/g, " ");
}

function extractYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value.trim());
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return url.pathname.slice(1).split("/")[0] || null;
    }

    if (
      hostname !== "youtube.com" &&
      hostname !== "m.youtube.com" &&
      hostname !== "music.youtube.com"
    ) {
      return null;
    }

    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/shorts/")[1]?.split("/")[0] || null;
    }

    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/embed/")[1]?.split("/")[0] || null;
    }

    return url.searchParams.get("v");
  } catch {
    return null;
  }
}

function formatYouTubeDuration(isoDuration: string): string {
  const match = isoDuration.match(
    /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/,
  );

  if (!match) {
    return isoDuration;
  }

  const days = Number(match[1] ?? 0);
  const hours = Number(match[2] ?? 0) + days * 24;
  const minutes = Number(match[3] ?? 0);
  const seconds = Number(match[4] ?? 0);

  if (hours > 0) {
    return [
      hours,
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }

  return [minutes, seconds.toString().padStart(2, "0")].join(":");
}

async function getYouTubeMetadata(
  youtubeUrl: string,
): Promise<{ data: YouTubeVideoMetadata } | { error: string }> {
  const videoId = extractYouTubeVideoId(youtubeUrl);

  if (!videoId) {
    return {
      error: "Enter a valid YouTube video URL.",
    };
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error("Missing YOUTUBE_API_KEY");
    return {
      error: "YouTube integration is not configured.",
    };
  }

  const params = new URLSearchParams({
    part: "snippet,contentDetails,status",
    id: videoId,
    key: apiKey,
  });

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?${params}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    console.error(
      "YouTube API request failed:",
      response.status,
      await response.text(),
    );

    return {
      error: "YouTube could not verify this video.",
    };
  }

  const result = (await response.json()) as {
    items?: Array<{
      snippet?: {
        thumbnails?: {
          maxres?: { url?: string };
          standard?: { url?: string };
          high?: { url?: string };
          medium?: { url?: string };
          default?: { url?: string };
        };
      };
      contentDetails?: {
        duration?: string;
      };
      status?: {
        embeddable?: boolean;
      };
    }>;
  };

  const item = result.items?.[0];

  if (!item) {
    return {
      error: "The YouTube video was not found or is unavailable.",
    };
  }

  if (item.status?.embeddable === false) {
    return {
      error: "This video does not allow embedding.",
    };
  }

  const thumbnail =
    item.snippet?.thumbnails?.maxres?.url ??
    item.snippet?.thumbnails?.standard?.url ??
    item.snippet?.thumbnails?.high?.url ??
    item.snippet?.thumbnails?.medium?.url ??
    item.snippet?.thumbnails?.default?.url;

  const isoDuration = item.contentDetails?.duration;

  if (!thumbnail || !isoDuration) {
    return {
      error: "YouTube returned incomplete video information.",
    };
  }

  return {
    data: {
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      youtubeEmbedUrl: `https://www.youtube.com/embed/${videoId}`,
      thumbnailUrl: thumbnail,
      duration: formatYouTubeDuration(isoDuration),
    },
  };
}

function validateTitle(title: string): string | null {
  const normalizedTitle = normalizeTitle(title);

  if (!normalizedTitle) {
    return "Enter a video title.";
  }

  if (normalizedTitle.length > 100) {
    return "The video title must be 100 characters or fewer.";
  }

  return null;
}

export async function createLandscapeVideo(
  input: CreateLandscapeVideoInput,
): Promise<LandscapeVideoActionResult> {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const titleError = validateTitle(input.title);

  if (titleError) {
    return { error: titleError };
  }

  const metadataResult = await getYouTubeMetadata(input.youtubeUrl);

  if ("error" in metadataResult) {
    return { error: metadataResult.error };
  }

  await connectDB();

  const mongoSession = await mongoose.startSession();

  try {
    let createdVideo: unknown;

    await mongoSession.withTransaction(async () => {
      const [board, section] = await Promise.all([
        LandscapeVideoBoard.findOne({
          _id: input.landscapeVideoBoardId,
          userId: session.user.id,
        }).session(mongoSession),

        LandscapeVideoSection.findOne({
          _id: input.landscapeVideoSectionId,
          landscapeVideoBoardId: input.landscapeVideoBoardId,
          userId: session.user.id,
        }).session(mongoSession),
      ]);

      if (!board || !section) {
        throw new Error("LANDSCAPE_VIDEO_SECTION_NOT_FOUND");
      }

      const duplicate = await LandscapeVideo.findOne({
        landscapeVideoSectionId: input.landscapeVideoSectionId,
        userId: session.user.id,
        youtubeUrl: metadataResult.data.youtubeUrl,
      }).session(mongoSession);

      if (duplicate) {
        throw new Error("LANDSCAPE_VIDEO_ALREADY_EXISTS");
      }

      const [video] = await LandscapeVideo.create(
        [
          {
            landscapeVideoSectionId: input.landscapeVideoSectionId,
            landscapeVideoBoardId: input.landscapeVideoBoardId,
            userId: session.user.id,
            order: section.landscapeVideos.length,
            isFeatured: false,
            title: normalizeTitle(input.title),
            fromYoutube: true,
            ...metadataResult.data,
          },
        ],
        {
          session: mongoSession,
        },
      );

      await LandscapeVideoSection.updateOne(
        {
          _id: section._id,
          userId: session.user.id,
        },
        {
          $push: {
            landscapeVideos: video._id,
          },
        },
        {
          session: mongoSession,
        },
      );

      createdVideo = video;
    });

    updateTag(`landscape-video-board-${session.user.id}`);

    return {
      data: serializeLandscapeVideo(createdVideo),
    };
  } catch (error) {
    console.error("Failed to create landscape video:", error);

    if (
      error instanceof Error &&
      error.message === "LANDSCAPE_VIDEO_ALREADY_EXISTS"
    ) {
      return {
        error: "This YouTube video is already in the section.",
      };
    }

    if (
      error instanceof Error &&
      error.message === "LANDSCAPE_VIDEO_SECTION_NOT_FOUND"
    ) {
      return {
        error: "The video section was not found.",
      };
    }

    return {
      error: "Failed to add the video.",
    };
  } finally {
    await mongoSession.endSession();
  }
}

export async function updateLandscapeVideo(
  videoId: string,
  input: UpdateLandscapeVideoInput,
): Promise<LandscapeVideoActionResult> {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const titleError = validateTitle(input.title);

  if (titleError) {
    return { error: titleError };
  }

  const metadataResult = await getYouTubeMetadata(input.youtubeUrl);

  if ("error" in metadataResult) {
    return { error: metadataResult.error };
  }

  await connectDB();

  try {
    const currentVideo = await LandscapeVideo.findOne({
      _id: videoId,
      userId: session.user.id,
    });

    if (!currentVideo) {
      return {
        error: "The video was not found.",
      };
    }

    const duplicate = await LandscapeVideo.findOne({
      _id: { $ne: videoId },
      landscapeVideoSectionId: currentVideo.landscapeVideoSectionId,
      userId: session.user.id,
      youtubeUrl: metadataResult.data.youtubeUrl,
    });

    if (duplicate) {
      return {
        error: "This YouTube video is already in the section.",
      };
    }

    const updatedVideo = await LandscapeVideo.findOneAndUpdate(
      {
        _id: videoId,
        userId: session.user.id,
      },
      {
        $set: {
          title: normalizeTitle(input.title),
          fromYoutube: true,
          ...metadataResult.data,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedVideo) {
      return {
        error: "The video was not found.",
      };
    }

    updateTag(`landscape-video-board-${session.user.id}`);

    return {
      data: serializeLandscapeVideo(updatedVideo),
    };
  } catch (error) {
    console.error("Failed to update landscape video:", error);

    return {
      error: "Failed to update the video.",
    };
  }
}

export async function setFeaturedLandscapeVideo(
  videoId: string,
): Promise<LandscapeVideoActionResult> {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const mongoSession = await mongoose.startSession();

  try {
    let featuredVideo: unknown;

    await mongoSession.withTransaction(async () => {
      const video = await LandscapeVideo.findOne({
        _id: videoId,
        userId: session.user.id,
      }).session(mongoSession);

      if (!video) {
        throw new Error("LANDSCAPE_VIDEO_NOT_FOUND");
      }

      await LandscapeVideo.updateMany(
        {
          landscapeVideoBoardId: video.landscapeVideoBoardId,
          userId: session.user.id,
          isFeatured: true,
          _id: { $ne: video._id },
        },
        {
          $set: {
            isFeatured: false,
          },
        },
        {
          session: mongoSession,
        },
      );

      video.isFeatured = true;
      await video.save({ session: mongoSession });

      featuredVideo = video;
    });

    updateTag(`landscape-video-board-${session.user.id}`);

    return {
      data: serializeLandscapeVideo(featuredVideo),
    };
  } catch (error) {
    console.error("Failed to feature landscape video:", error);

    return {
      error: "Failed to set the featured video.",
    };
  } finally {
    await mongoSession.endSession();
  }
}

export async function deleteLandscapeVideo(videoId: string): Promise<
  | {
      success: true;
      deletedVideoId: string;
    }
  | {
      success?: never;
      error: string;
    }
> {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const mongoSession = await mongoose.startSession();

  try {
    await mongoSession.withTransaction(async () => {
      const video = await LandscapeVideo.findOne({
        _id: videoId,
        userId: session.user.id,
      }).session(mongoSession);

      if (!video) {
        throw new Error("LANDSCAPE_VIDEO_NOT_FOUND");
      }

      await LandscapeVideoSection.updateOne(
        {
          _id: video.landscapeVideoSectionId,
          userId: session.user.id,
        },
        {
          $pull: {
            landscapeVideos: video._id,
          },
        },
        {
          session: mongoSession,
        },
      );

      await LandscapeVideo.deleteOne(
        {
          _id: video._id,
          userId: session.user.id,
        },
        {
          session: mongoSession,
        },
      );

      await LandscapeVideo.updateMany(
        {
          landscapeVideoSectionId: video.landscapeVideoSectionId,
          userId: session.user.id,
          order: { $gt: video.order },
        },
        {
          $inc: {
            order: -1,
          },
        },
        {
          session: mongoSession,
        },
      );
    });

    updateTag(`landscape-video-board-${session.user.id}`);

    return {
      success: true,
      deletedVideoId: videoId,
    };
  } catch (error) {
    console.error("Failed to delete landscape video:", error);

    return {
      error: "Failed to delete the video.",
    };
  } finally {
    await mongoSession.endSession();
  }
}
