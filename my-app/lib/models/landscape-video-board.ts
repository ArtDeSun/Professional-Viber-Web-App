import mongoose, { Document, Schema } from "mongoose";

export interface ILandscapeVideoBoard extends Document {
  landscapeVideoSections: mongoose.Types.ObjectId[];
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const LandscapeVideoBoardSchema = new Schema<ILandscapeVideoBoard>(
  {
    landscapeVideoSections: [
      {
        type: Schema.Types.ObjectId,
        ref: "LandscapeVideoSection",
      },
    ],
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.LandscapeVideoBoard ||
  mongoose.model<ILandscapeVideoBoard>(
    "LandscapeVideoBoard",
    LandscapeVideoBoardSchema,
  );
