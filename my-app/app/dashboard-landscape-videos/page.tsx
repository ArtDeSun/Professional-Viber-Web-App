//import DashboardLandscapeVideos from "@/components/music-videos-dashboard/landscape-videos/dashboard-landscape-videos";
import DashboardLandscapeVideosClient from "@/components/music-videos-dashboard/landscape-videos/dashboard-landscape-videos-client";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { initializeUserLandscapeVideoBoard } from "@/lib/init-user-board";
import { LandscapeVideoBoard } from "@/lib/models";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getLandscapeVideoBoard(userId: string) {
  "use cache";
  await connectDB();

  let landscapeVideoBoardDoc = await LandscapeVideoBoard.findOne({
    userId: userId,
    name: "Landscape Video Dashboard",
  }).populate({
    path: "landscapeVideoSections",
    populate: { path: "landscapeVideos" },
  });

  if (!landscapeVideoBoardDoc) {
    await initializeUserLandscapeVideoBoard(userId);

    landscapeVideoBoardDoc = await LandscapeVideoBoard.findOne({
      userId,
      name: "Landscape Video Dashboard",
    }).populate({
      path: "landscapeVideoSections",
      populate: {
        path: "landscapeVideos",
      },
    });
  }

  if (!landscapeVideoBoardDoc) {
    throw new Error("Failed to initialize landscape video board.");
  }

  const landscapeVideoBoard = JSON.parse(
    JSON.stringify(landscapeVideoBoardDoc),
  );

  return landscapeVideoBoard;
}

async function DashboardLandscapeVideos() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/");
  }
  const landscapeVideoBoard = await getLandscapeVideoBoard(
    session?.user.id ?? "",
  );
  return (
    <DashboardLandscapeVideosClient
      landscapeVideoBoard={landscapeVideoBoard}
      userId={session.user.id}
    />
  );
}

export default function getDashboardLandscapeVideos() {
  return (
    <main
      className="
      relative min-h-screen
      py-38 font-redHatDisplay text-white
      sm:py-42
      lg:py-46
    "
    >
      <Suspense
        fallback={
          <h1 className="text-center break-words leading-none text-4xl sm:text-5xl lg:text-6xl">
            LOADING DASHBOARD LANDSCAPE VIDEOS...
          </h1>
        }
      >
        <DashboardLandscapeVideos />
      </Suspense>
    </main>
  );
}
