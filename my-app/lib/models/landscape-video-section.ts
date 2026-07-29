import mongoose, { Document, Schema } from "mongoose";

export interface ILandscapeVideoSection extends Document {
  landscapeVideoBoardId: mongoose.Types.ObjectId;
  landscapeVideos: mongoose.Types.ObjectId[];
  userId: string;
  order: number;
  label: string;
  createdAt: Date;
  updatedAt: Date;
}

const LandscapeVideoSectionSchema = new Schema<ILandscapeVideoSection>(
  {
    landscapeVideoBoardId: {
      type: Schema.Types.ObjectId,
      ref: "LandscapeVideoBoard",
      required: true,
      index: true,
    },
    landscapeVideos: [
      {
        type: Schema.Types.ObjectId,
        ref: "LandscapeVideo",
      },
    ],
    userId: {
      type: String,
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.LandscapeVideoSection ||
  mongoose.model<ILandscapeVideoSection>(
    "LandscapeVideoSection",
    LandscapeVideoSectionSchema,
  );
