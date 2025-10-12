import mongoose, { Schema } from "mongoose";
import { AvalableTaskStatus, TaskStatusEnum } from "../config/constants";
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignto: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignby: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: AvalableTaskStatus,
      default: TaskStatusEnum.TODO,
    },
    attachment:{
        type:[{url:String,
            mimetype:String,
            size:Number,

        }],default:[]
    }
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
