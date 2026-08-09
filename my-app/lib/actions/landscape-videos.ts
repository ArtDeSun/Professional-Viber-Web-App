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

import { getYouTubeVideoMetadata } from "../integrations/youtube/get-youtube-video-metadata";
import { prepareLandscapeVideo } from "../landscape-videos.ts/prepare-landscape-video";

type CreateLandscapeVideoInput = {
  landscapeVideoBoardId: string;
  landscapeVideoSectionId: string;
  title?: string;
  youtubeUrl: string;
};

type UpdateLandscapeVideoInput = {
  title?: string;
  youtubeUrl: string;
};

type LandscapeVideoActionResult =
  | {
      data: LandscapeVideoType;
    }
  | {
      error: string;
    };

function serializeLandscapeVideo(video: unknown): LandscapeVideoType {
  return JSON.parse(JSON.stringify(video)) as LandscapeVideoType;
}

export async function createLandscapeVideo(
  input: CreateLandscapeVideoInput,
): Promise<LandscapeVideoActionResult> {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const preparedResult = await prepareLandscapeVideo(
    input,
    getYouTubeVideoMetadata,
  );

  if ("error" in preparedResult) {
    return { error: preparedResult.error };
  }

  await connectDB();

  const mongoSession = await mongoose.startSession();

  try {
    let createdVideo: unknown;

    await mongoSession.withTransaction(async () => {
      const board = await LandscapeVideoBoard.findOne({
        _id: input.landscapeVideoBoardId,
        userId: session.user.id,
      }).session(mongoSession);

      const section = await LandscapeVideoSection.findOne({
        _id: input.landscapeVideoSectionId,
        landscapeVideoBoardId: input.landscapeVideoBoardId,
        userId: session.user.id,
      }).session(mongoSession);

      if (!board || !section) {
        throw new Error("LANDSCAPE_VIDEO_SECTION_NOT_FOUND");
      }

      const duplicate = await LandscapeVideo.findOne({
        landscapeVideoSectionId: input.landscapeVideoSectionId,
        userId: session.user.id,
        youtubeUrl: preparedResult.data.youtubeUrl,
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
            ...preparedResult.data,
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

  const preparedResult = await prepareLandscapeVideo(
    input,
    getYouTubeVideoMetadata,
  );

  if ("error" in preparedResult) {
    return { error: preparedResult.error };
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
      youtubeUrl: preparedResult.data.youtubeUrl,
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
        $set: preparedResult.data,
      },
      {
        returnDocument: "after",
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
