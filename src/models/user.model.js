import mongoose, { Schema } from "mongoose";
 import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
    avatar: {
      type: { url: String, localPath: String },
      default: {
        url: `https://placehold.co/600x400`,
        localPath: ``,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    IsEmailVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpry: {
      type: Date,
    },
    RefreshTOken: {
      type: String,
    },
    EmailVerificationToken: {
      type: String,
    },
    EmailVerificationTokenExpry: {
      type: Date,
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password , 10 )
});

export const User = mongoose.model("User", userSchema);
