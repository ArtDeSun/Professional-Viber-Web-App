import connectDB from "./db";
import {
  Board,
  Column,
  LandscapeVideoBoard,
  LandscapeVideoSection,
} from "./models";

const DEFAULT_COLUMNS = [
  {
    name: "Wish List",
    order: 0,
  },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();

    // Check if board already exists
    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

    if (existingBoard) {
      return existingBoard;
    }

    // Create the board
    const board = await Board.create({ name: "Job Hunt", userId, columns: [] });

    // Create default columns
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          userId: userId,
          boardId: board._id,
          jobApplications: [],
        }),
      ),
    );

    // Update the board with the new column IDs
    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
  } catch (err) {
    throw err;
  }
}

// ---------------------------------------------------------------------------

const DEFAULT_LANDSCAPE_VIDEO_SECTIONS = [
  {
    label: "Latest Videos",
    order: 0,
  },
  {
    label: "Covers",
    order: 1,
  },
  {
    label: "Solo Piano",
    order: 2,
  },
  {
    label: "Tutorials",
    order: 3,
  },
  {
    label: "Live Sessions",
    order: 4,
  },
];

export async function initializeUserLandscapeVideoBoard(userId: string) {
  try {
    await connectDB();

    // Check if landscape video board already exists
    const existingLandscapeVideoBoard = await LandscapeVideoBoard.findOne({
      userId,
      name: "Landscape Video Dashboard",
    });

    if (existingLandscapeVideoBoard) {
      return existingLandscapeVideoBoard;
    }

    // Create the landscape video board
    const landscapeVideoBoard = await LandscapeVideoBoard.create({
      name: "Landscape Video Dashboard",
      userId,
      landscapeVideoSections: [],
    });

    // Create default landscape video sections
    const landscapeVideoSections = await Promise.all(
      DEFAULT_LANDSCAPE_VIDEO_SECTIONS.map((sec) =>
        LandscapeVideoSection.create({
          landscapeVideoBoardId: landscapeVideoBoard._id,
          landscapeVideos: [],
          userId: userId,
          order: sec.order,
          label: sec.label,
        }),
      ),
    );

    // Update the landscape video board with the new landscape video section IDs
    landscapeVideoBoard.landscapeVideoSections = landscapeVideoSections.map(
      (sec) => sec._id,
    );
    await landscapeVideoBoard.save();

    return landscapeVideoBoard;
  } catch (err) {
    return err;
  }
}
