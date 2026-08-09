import {
  GetYouTubeVideoMetadata,
  YouTubeMetadataResult,
} from "@/lib/landscape-videos.ts/youtube-video-metadata";

const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

function extractYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value.trim());
    const hostname = url.hostname.replace(/^www\./, "");

    let videoId: string | null = null;

    if (hostname === "youtu.be") {
      videoId = url.pathname.slice(1).split("/")[0] || null;
    } else if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "music.youtube.com"
    ) {
      if (url.pathname.startsWith("/shorts/")) {
        videoId = url.pathname.split("/shorts/")[1]?.split("/")[0] || null;
      } else if (url.pathname.startsWith("/embed/")) {
        videoId = url.pathname.split("/embed/")[1]?.split("/")[0] || null;
      } else {
        videoId = url.searchParams.get("v");
      }
    }

    return videoId && YOUTUBE_VIDEO_ID_PATTERN.test(videoId) ? videoId : null;
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

export const getYouTubeVideoMetadata: GetYouTubeVideoMetadata = async (
  youtubeUrl,
): Promise<YouTubeMetadataResult> => {
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

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${params}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
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
          title?: string;
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
    const youtubeTitle = item.snippet?.title;
    const thumbnail =
      item.snippet?.thumbnails?.maxres?.url ??
      item.snippet?.thumbnails?.standard?.url ??
      item.snippet?.thumbnails?.high?.url ??
      item.snippet?.thumbnails?.medium?.url ??
      item.snippet?.thumbnails?.default?.url;
    const isoDuration = item.contentDetails?.duration;
    if (!youtubeTitle || !thumbnail || !isoDuration) {
      return {
        error: "YouTube returned incomplete video information.",
      };
    }
    return {
      data: {
        title: youtubeTitle,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        youtubeEmbedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl: thumbnail,
        duration: formatYouTubeDuration(isoDuration),
      },
    };
  } catch (error) {
    console.error("YouTube API request failed:", error);
    return {
      error: "YouTube could not verify this video.",
    };
  }
};
