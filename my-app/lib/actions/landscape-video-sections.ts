"use server";

import { updateTag } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import {
  LandscapeVideo,
  LandscapeVideoBoard,
  LandscapeVideoSection,
} from "../models";

import mongoose from "mongoose";

interface LandscapeVideoSectionData {
  landscapeVideoBoardId: string;
  label?: string;
}

export async function createLandscapeVideoSection(
  data: LandscapeVideoSectionData,
) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const { label, landscapeVideoBoardId } = data;

  if (!label || !landscapeVideoBoardId) {
    return { error: "Missing required fields" };
  }

  const landscapeVideoBoard = await LandscapeVideoBoard.findOne({
    _id: landscapeVideoBoardId,
    userId: session.user.id,
  });

  if (!landscapeVideoBoard) {
    return { error: "Landscape Video Board not found" };
  }

  const lastLandscapeVideoSectionOrder =
    landscapeVideoBoard?.landscapeVideoSections.length ?? 0;

  const landscapeVideoSection = await LandscapeVideoSection.create({
    landscapeVideoBoardId,
    landscapeVideos: [],
    userId: session.user.id,
    order: lastLandscapeVideoSectionOrder,
    label,
  });

  await LandscapeVideoBoard.findByIdAndUpdate(landscapeVideoBoardId, {
    $push: { landscapeVideoSections: landscapeVideoSection._id },
  });

  //revalidatePath("/dashboard-landscape-videos");
  updateTag(`landscape-video-board-${session.user.id}`);

  return { data: JSON.parse(JSON.stringify(landscapeVideoSection)) };
}

export async function updateLandscapeVideoSection(
  id: string,
  updates: {
    label: string;
  },
) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const label = updates.label;

  const updated = await LandscapeVideoSection.findOneAndUpdate(
    {
      _id: id,
      userId: session.user.id,
    },
    {
      $set: {
        label,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updated) {
    return {
      error: "Landscape video section not found or unauthorized",
    };
  }

  //revalidatePath("/dashboard-landscape-videos");
  updateTag(`landscape-video-board-${session.user.id}`);

  return { data: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteLandscapeVideoSection(id: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const mongoSession = await mongoose.startSession();

  try {
    let deletedOrder: number | undefined;
    await mongoSession.withTransaction(async () => {
      const landscapeVideoSection = await LandscapeVideoSection.findOne({
        _id: id,
        userId: session.user.id,
      }).session(mongoSession);

      if (!landscapeVideoSection) {
        throw new Error("LANDSCAPE_VIDEO_SECTION_NOT_FOUND");
      }

      const landscapeVideoBoardId = landscapeVideoSection.landscapeVideoBoardId;

      deletedOrder = landscapeVideoSection.order;

      const landscapeVideoBoard = await LandscapeVideoBoard.findOne({
        _id: landscapeVideoBoardId,
        userId: session.user.id,
      }).session(mongoSession);

      if (!landscapeVideoBoard) {
        throw new Error("LANDSCAPE_VIDEO_BOARD_NOT_FOUND");
      }

      const boardUpdateResult = await LandscapeVideoBoard.updateOne(
        {
          _id: landscapeVideoBoardId,
          userId: session.user.id,
        },
        {
          $pull: {
            landscapeVideoSections: landscapeVideoSection._id,
          },
        },
        {
          session: mongoSession,
        },
      );

      if (boardUpdateResult.matchedCount === 0) {
        throw new Error("LANDSCAPE_VIDEO_BOARD_UPDATE_FAILED");
      }

      await LandscapeVideo.deleteMany(
        {
          landscapeVideoSectionId: landscapeVideoSection._id,
          landscapeVideoBoardId,
          userId: session.user.id,
        },
        {
          session: mongoSession,
        },
      );

      const sectionDeleteResult = await LandscapeVideoSection.deleteOne(
        {
          _id: landscapeVideoSection._id,
          userId: session.user.id,
        },
        {
          session: mongoSession,
        },
      );

      if (sectionDeleteResult.deletedCount !== 1) {
        throw new Error("LANDSCAPE_VIDEO_SECTION_DELETE_FAILED");
      }

      await LandscapeVideoSection.updateMany(
        {
          landscapeVideoBoardId,
          userId: session.user.id,
          order: {
            $gt: deletedOrder,
          },
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

    //revalidatePath("/dashboard-landscape-videos");
    updateTag(`landscape-video-board-${session.user.id}`);

    return { success: true, deletedSectionId: id, deletedOrder };
  } catch (error) {
    console.error("Failed to delete landscape video section:", error);
    if (
      error instanceof Error &&
      error.message === "LANDSCAPE_VIDEO_SECTION_NOT_FOUND"
    ) {
      return {
        error: "Landscape Video Section not found",
      };
    }

    if (
      error instanceof Error &&
      error.message === "LANDSCAPE_VIDEO_BOARD_NOT_FOUND"
    ) {
      return {
        error: "Landscape Video Board not found",
      };
    }

    return {
      error: "Failed to delete landscape video section",
    };
  } finally {
    await mongoSession.endSession();
  }
}
