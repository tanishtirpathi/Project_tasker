import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createProjects,
  getProjectbyId,
  getProjects,
  updateProject,
} from "../controllers/project.controller.js";
const router = Router();
router.route("/").get(verifyJWT, getProjects);
router.route("/createProject").post(verifyJWT, createProjects);
router
  .route("/:projectId")
  .get(verifyJWT, getProjectbyId)
  .post(verifyJWT, updateProject);
export default router;
