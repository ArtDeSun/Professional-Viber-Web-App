import mongoose, { Document, Schema } from "mongoose";

export interface ILandscapeVideo extends Document {
  landscapeVideoSectionId: mongoose.Types.ObjectId;
  landscapeVideoBoardId: mongoose.Types.ObjectId;
  userId: string;
  order: number;
  isFeatured: boolean;
  title: string;
  fromYoutube: boolean;
  youtubeUrl?: string;
  youtubeEmbedUrl?: string;
  thumbnailUrl?: string;
  duration: string;
  createdAt: Date; //Equivalent to uploadedAt?: string; in this application
  updatedAt: Date;
}

const LandscapeVideoSchema = new Schema<ILandscapeVideo>(
  {
    landscapeVideoSectionId: {
      type: Schema.Types.ObjectId,
      ref: "LandscapeVideoSection",
      required: true,
      index: true,
    },
    landscapeVideoBoardId: {
      type: Schema.Types.ObjectId,
      ref: "LandscapeVideoBoard",
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    fromYoutube: {
      type: Boolean,
      required: true,
    },
    youtubeUrl: {
      type: String,
    },
    youtubeEmbedUrl: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    duration: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.LandscapeVideo ||
  mongoose.model<ILandscapeVideo>("LandscapeVideo", LandscapeVideoSchema);
