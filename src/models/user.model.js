import crypto from "crypto";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
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
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (passowrd) {
  return await bcrypt.compare(passowrd, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateEmailVerificationToken = function () {
  const unhashedtoken = crypto.randomBytes(32).toString("hex");
  const hasedtoken = crypto
    .createHash("sha256")
    .update(unhashedtoken)
    .digest("hex");
  const tokenExpiry = Date.now() + 30 * 60 * 1000;
  return { hasedtoken, unhashedtoken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
