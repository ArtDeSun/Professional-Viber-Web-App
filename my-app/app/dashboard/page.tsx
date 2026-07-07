/* import KanbanBoard from "@/components/kanban-board"; */
import DashboardLoading from "@/components/dashboard-loading";
import KanbanBoardClient from "@/components/kanban-board-client";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getBoard(userId: string) {
  "use cache";
  await connectDB();

  const boardDoc = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  }).populate({ path: "columns", populate: { path: "jobApplications" } });

  if (!boardDoc) return null;

  const board = JSON.parse(JSON.stringify(boardDoc));

  return board;
}

async function DashboardPage() {
  const session = await getSession();
  const board = await getBoard(session?.user.id ?? "");

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-6 py-32">
      <KanbanBoardClient board={board} userId={session.user.id} />
    </div>
  );
}

export default async function getDashBoard() {
  /*   const session = await getSession();
  const board = await getBoard(session?.user.id ?? "");

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="container mx-auto px-6 py-32">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-100">{board.name}</h1>
          <p className="text-neutral-400">Track your job applications</p>
        </div>
        <KanbanBoard
          board={JSON.parse(JSON.stringify(board))}
          userId={session.user.id}
        />
      </div>
    </div>
  ); */

  return (
    <div className="min-h-screen w-full bg-black">
      <Suspense fallback={<DashboardLoading />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
}
