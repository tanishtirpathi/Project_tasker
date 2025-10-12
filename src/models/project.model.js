import mongoose, { Schema } from "mongoose";

const projectschema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectschema);
