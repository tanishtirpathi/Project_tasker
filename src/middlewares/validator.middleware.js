import { ApiError } from "../config/apiError.js";
import { validationResult } from "express-validator";
export const validate = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }
  const extractedErrors = [];

  error.array().map((err) =>
    extractedErrors.push({
      [err.path]: err.msg,
    })
  );

  throw new ApiError(422, "reced data is not valid ", extractedErrors);
};
