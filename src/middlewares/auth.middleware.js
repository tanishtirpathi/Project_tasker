import jwt from "jsonwebtoken";
import { ApiError } from "../config/apiError.js";

export const verifyJWT = (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "No token provided");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      throw new ApiError(400, "Access token is corrupted or malformed");
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verification error:", err.message);
    throw new ApiError(
      401,
      `Invalid or expired access token go and login again : ${err.message}`
    );
  }
};
