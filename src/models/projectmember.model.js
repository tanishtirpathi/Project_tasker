import mongoose, { Schema } from "mongoose";
import { AvalableUserRoles, UserRolesEnum } from "../config/constants";
const projectMemberschema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvalableUserRoles,
      default: UserRolesEnum.MEMBER,
    },
  },
  { timestamps: true }
);

export const ProjectMember = mongoose.model(
  "ProjectMember",
  projectMemberschema
);
