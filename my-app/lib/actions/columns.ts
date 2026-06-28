"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";

interface ColumnData {
  name?: string;
  boardId: string;
}

export async function createColumn(data: ColumnData) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const { name, boardId } = data;

  if (!name || !boardId) {
    return { error: "Missing required fields" };
  }

  // Verify board ownership
  const board = await Board.findOne({ _id: boardId, userId: session.user.id });

  if (!board) {
    return { error: "Board not found" };
  }

  const lastColumnOrder = board?.columns.length ?? 0;

  const column = await Column.create({
    name,
    boardId,
    userId: session.user.id,
    order: lastColumnOrder,
    jobApplications: [],
  });

  await Board.findByIdAndUpdate(boardId, {
    $push: { columns: column._id },
  });

  revalidatePath("/dashboard");

  return { data: JSON.parse(JSON.stringify(column)) };
}

export async function deleteColumn(id: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const column = await Column.findById(id);

  if (!column) {
    return { error: "Column not found" };
  }

  if (column.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  await Board.findByIdAndUpdate(column.boardId, {
    $pull: { columns: id },
  });

  await Column.deleteOne({ _id: id });
  await JobApplication.deleteMany({ columnId: id });

  revalidatePath("/dashboard");

  return { success: true };
}
