import { Router } from "express";
import {
  regesterUser,
  verfiyUser,
  loginUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegerstrationValidator } from "../validator/index.js";
const router = Router();
router.route("/verify/:token").get(verfiyUser);
router.route("/login").post(loginUser);
router
  .route("/register")
  .post(userRegerstrationValidator(), validate, regesterUser);
export default router;
