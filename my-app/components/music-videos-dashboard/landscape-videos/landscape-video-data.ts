import { Film, Music, Piano, Radio, Video } from "lucide-react";
import type {
  ExtractedYoutubeMetadata,
  LandscapeVideo,
  LandscapeVideoSectionData,
} from "./landscape-video-types";

const TEST_YOUTUBE_URL = "https://www.youtube.com/watch?v=TuZ4Xcb7D9w";

const TEST_YOUTUBE_EMBED = "https://www.youtube.com/embed/TuZ4Xcb7D9w";

const TEST_THUMBNAIL_URL = "/hero-images/AI_Generated_Basement_Studio.png";

export const featuredLandscapeVideo: LandscapeVideo = {
  id: "featured-1",
  title: "Expressive long-form piano showcase",
  sourceType: "youtube",
  youtubeUrl: TEST_YOUTUBE_URL,
  thumbnailUrl: TEST_THUMBNAIL_URL,
  youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
  duration: "3:50",
  uploadedAt: "Testing",
};

function makeVideo(id: string, title: string): LandscapeVideo {
  return {
    id,
    title,
    sourceType: "youtube",
    youtubeUrl: TEST_YOUTUBE_URL,
    youtubeEmbedUrl: TEST_YOUTUBE_EMBED,
    thumbnailUrl: TEST_THUMBNAIL_URL,
    duration: "3:50",
    uploadedAt: "Testing",
  };
}

export const initialLandscapeVideoSections: LandscapeVideoSectionData[] = [
  {
    id: "latest",
    label: "Latest Videos",
    icon: Video,
    videos: [
      makeVideo("latest-1", "Cinematic piano textures and ambient harmony"),
      makeVideo("latest-2", "Complete music performance with storytelling"),
      makeVideo("latest-3", "Cinematic piano textures and ambient harmony"),
      makeVideo("latest-4", "Complete music performance with storytelling"),
      makeVideo("latest-5", "Cinematic piano textures and ambient harmony"),
      makeVideo("latest-6", "Complete music performance with storytelling"),
      makeVideo("latest-7", "Cinematic piano textures and ambient harmony"),
      makeVideo("latest-8", "Complete music performance with storytelling"),
      makeVideo("latest-9", "Cinematic piano textures and ambient harmony"),
      makeVideo("latest-10", "Complete music performance with storytelling"),
    ],
  },
  {
    id: "covers",
    label: "Covers",
    icon: Music,
    videos: [
      makeVideo("covers-1", "Sentimental piano cover in ultra-wide format"),
      makeVideo("covers-2", "21-century cover with epic keyboard plugins"),
    ],
  },
  {
    id: "piano",
    label: "Solo Piano",
    icon: Piano,
    videos: [
      makeVideo("piano-1", "Solo piano performance with Chopinesque phrasing"),
      makeVideo("piano-2", "Classical-inspired long-form piano session"),
    ],
  },
  {
    id: "production",
    label: "Tutorials",
    icon: Film,
    videos: [
      makeVideo(
        "tutorial-1",
        "Building a full music video from beginning to finish",
      ),
      makeVideo(
        "tutorial-2",
        "Spice up your R&B arrangement with these 3 Jazz chords",
      ),
    ],
  },
  {
    id: "live",
    label: "Live Sessions",
    icon: Radio,
    videos: [
      makeVideo("live-1", "Live studio session with ambient sounds"),
      makeVideo("live-2", "Improvised cinematic live performance"),
    ],
  },
];

async function extractYoutubeMetadata(
  youtubeUrl: string,
): Promise<ExtractedYoutubeMetadata> {
  const response = await fetch("/api/youtube-metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      youtubeUrl,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error ?? `Unable to extract YouTube metadata (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("The metadata server returned an invalid response");
  }

  return data;
}

export async function createVideoFromYoutubeLink(
  youtubeUrl: string,
): Promise<LandscapeVideo> {
  const metadata = await extractYoutubeMetadata(youtubeUrl);

  return {
    id: crypto.randomUUID(),
    sourceType: "youtube",
    youtubeUrl,
    title: metadata.title,
    duration: metadata.duration,
    uploadedAt: metadata.uploadedAt,
    thumbnailUrl: metadata.thumbnailUrl,
    youtubeEmbedUrl: metadata.youtubeEmbedUrl,
  };
}
