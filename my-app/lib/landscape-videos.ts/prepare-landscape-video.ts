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

  if (customTitle.length > 20) {
    return {
      error: "The video title must be 20 characters or fewer.",
    };
  }

  const metadataResult = await getYouTubeMetadata(input.youtubeUrl);

  if ("error" in metadataResult) {
    return metadataResult;
  }

  const title = customTitle
    ? customTitle
    : `${normalizeTitle(metadataResult.data.title).slice(0, 20)}...`;

  return {
    data: {
      ...metadataResult.data,
      title,
      fromYoutube: true,
    },
  };
}
