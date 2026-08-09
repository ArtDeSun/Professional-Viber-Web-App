import type {
  GetYouTubeVideoMetadata,
  YouTubeVideoMetadata,
} from "./youtube-video-metadata";

type PrepareLandscapeVideoInput = {
  title?: string;
  youtubeUrl: string;
};

type PreparedLandscapeVideo = YouTubeVideoMetadata & {
  title?: string;
  fromYoutube: true;
};

type PrepareLandscapeVideoResult =
  | {
      data: PreparedLandscapeVideo;
    }
  | {
      error: string;
    };

function normalizeTitle(title: string): string {
  return title.trim().replace(/\s+/g, " ");
}

export async function prepareLandscapeVideo(
  input: PrepareLandscapeVideoInput,
  getYouTubeMetadata: GetYouTubeVideoMetadata,
): Promise<PrepareLandscapeVideoResult> {
  const customTitle = normalizeTitle(input.title ?? "");

  if (customTitle.length > 40) {
    return {
      error: "The video title must be 40 characters or fewer.",
    };
  }

  const metadataResult = await getYouTubeMetadata(input.youtubeUrl);

  if ("error" in metadataResult) {
    return metadataResult;
  }

  const normalizedTitle = normalizeTitle(metadataResult.data.title);
  const title = customTitle
    ? customTitle
    : normalizedTitle.length > 37
      ? `${normalizedTitle.slice(0, 37)}...`
      : normalizedTitle;

  return {
    data: {
      ...metadataResult.data,
      title,
      fromYoutube: true,
    },
  };
}
