//Attempt at DIP

export type YouTubeVideoMetadata = {
  title: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  thumbnailUrl: string;
  duration: string;
};

export type YouTubeMetadataResult =
  | { data: YouTubeVideoMetadata }
  | { error: string };

export type GetYouTubeVideoMetadata = (
  youtubeUrl: string,
) => Promise<YouTubeMetadataResult>;
