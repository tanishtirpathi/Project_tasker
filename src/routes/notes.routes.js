import { Router } from "express";
import {
  getNotes,
  createNotes,
  getNotesId,
  updateNotes,
  deleteNotes,
} from "../controllers/note.controller.js";
import UserRolesEnum, { AvalableUserRoles } from "../config/constants.js";
import validateProjectPremission from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
const router = Router();
router
  .route("/:projectId")
  .get(validateProjectPremission(AvalableUserRoles), getNotes)
  .post(validateProjectPremission([UserRolesEnum.ADMIN]), createNotes);

router
  .route("/:projectId/n/:noteId")
  .get(validateProjectPremission(AvalableUserRoles), getNotesId)
  .put(validateProjectPremission(UserRolesEnum.ADMIN))
  .delete(validateProjectPremission(UserRolesEnum.ADMIN));
export default router;
