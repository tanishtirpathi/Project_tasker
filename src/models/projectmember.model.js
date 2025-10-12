import mongoose, { Schema } from "mongoose";
import {AvalableUserRoles , UserRolesEnum} from "../config/constants"
const projectMemberschema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    Role: {
      type: String,
      enum:AvalableUserRoles,
      default:UserRolesEnum.MEMBER
    },
  },
  { timestamps: true }
);

export const ProjectMember = mongoose.model(
  "ProjectMember",
  projectMemberschema
);
