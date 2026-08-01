//import DashboardLandscapeVideos from "@/components/music-videos-dashboard/landscape-videos/dashboard-landscape-videos";
import DashboardLandscapeVideosClient from "@/components/music-videos-dashboard/landscape-videos/dashboard-landscape-videos-client";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { initializeUserLandscapeVideoBoard } from "@/lib/init-user-board";
import { LandscapeVideoBoard } from "@/lib/models";
import { cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getLandscapeVideoBoard(userId: string) {
  "use cache";

  cacheTag(`landscape-video-board-${userId}`);

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
  const landscapeVideoBoardPromise = getLandscapeVideoBoard(session.user.id);
  return (
    <DashboardLandscapeVideosClient
      landscapeVideoBoardPromise={landscapeVideoBoardPromise}
      userId={session.user.id}
    />
  );
}

export default function GetDashboardLandscapeVideos() {
  return (
    <main
      className="
      relative min-h-screen
      py-38 font-redHatDisplay text-white
      sm:py-42
      lg:py-46
    "
    >
      <Suspense fallback={<DashboardAuthenticationFallback />}>
        <DashboardLandscapeVideos />
      </Suspense>
    </main>
  );
}

function DashboardAuthenticationFallback() {
  return (
    <div
    /* aria-hidden="true"
      className="
        relative mx-auto min-h-[100vh]
        w-full max-w-8xl
        px-4 pl-4
        sm:px-6 sm:pl-24
        lg:pl-[19rem]
      " */
    >
      <div
      /* className="
          min-h-[100vh] animate-pulse
          rounded-2xl bg-white/5
          sm:rounded-3xl
        " */
      />
    </div>
  );
}
