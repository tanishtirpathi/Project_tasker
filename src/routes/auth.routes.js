import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  regesterUser,
  verfiyUser,
  refreshAccessTokenRefresh,
  getcurrentUser,
  resendVerificationEmailToken,
  loginUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegerstrationValidator } from "../validator/index.js";
const router = Router();
router.route("/verify/:token").get(verfiyUser);
router.route("/login").post(loginUser);
router.route("/EmailVerification").get(verifyJWT, resendVerificationEmailToken);
router
  .route("/generateRefreshAccessToken")
  .get(verifyJWT, refreshAccessTokenRefresh);
router.route("/getme").get(verifyJWT, getcurrentUser);
router
  .route("/register")
  .post(userRegerstrationValidator(), validate, regesterUser);
export default router;
