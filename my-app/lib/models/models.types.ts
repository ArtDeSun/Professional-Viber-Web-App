export interface JobApplication {
  _id: string;
  company: string;
  position: string;
  location?: string;
  status: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  order: number;
  columnId?: string;
  tags?: string[];
  description?: string;
}

export interface Column {
  _id: string;
  name: string;
  order: number;
  jobApplications: JobApplication[];
}

export interface Board {
  _id: string;
  name: string;
  columns: Column[];
}

// --------------------------------------------------------------------------------------------

export interface LandscapeVideo {
  _id: string;
  landscapeVideoSectionId: string;
  landscapeVideoBoardId: string;
  userId: string;
  order: number;
  isFeatured: boolean;
  title: string;
  fromYoutube: boolean;
  youtubeUrl?: string;
  youtubeEmbedUrl?: string;
  thumbnailUrl?: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LandscapeVideoSection {
  _id: string;
  landscapeVideoBoardId: string;
  landscapeVideos: LandscapeVideo[];
  userId: string;
  order: number;
  label: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LandscapeVideoBoard {
  _id: string;
  landscapeVideoSections: LandscapeVideoSection[];
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
