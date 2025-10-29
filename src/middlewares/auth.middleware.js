import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../config/apiError.js";
import { AsyncHandller } from "../config/AsyncHandler.js";
import { ProjectMember } from "../models/projectmember.model.js";
import mongoose from "mongoose";
export const verifyJWT = AsyncHandller(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "No token provided");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      throw new ApiError(400, "Access token is corrupted or malformed");
    }
    const user = await User.findById(decoded?._id);
    if (!user) {
      throw new ApiError(401, "invalid user so access token is invalid ");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("JWT verification error:", err.message);
    throw new ApiError(
      401,
      `Invalid or expired access token go and login again : ${err.message}`
    );
  }
});

export const validateProjectPremission = (roles = []) =>
  AsyncHandller(async (req, res, next) => {
    const { projectId } = req.params;
    if (!projectId) {
      throw new ApiError(401, "invalid project id ");
    }

    const project = await ProjectMember.findOne({
      project: projectId,
      user: req.user?._id,
    });
    if (!project) {
      throw new ApiError(401, "no project found ");
    }
    const givenRole = project?.role;
    req.user.role = givenRole;
    if (!roles.includes(givenRole)) {
      throw new ApiError(403, "you don't have permission ");
    }
  });
