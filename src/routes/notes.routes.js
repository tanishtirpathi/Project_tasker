import { Router } from "express";
import {
  getNotes,
  createNotes,
  getNotesId,
  updateNotes,
  deleteNotes,
} from "../controllers/note.controller.js";
import { UserRolesEnum, AvalableUserRoles } from "../config/constants.js";
import {
  validateProjectPremission,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
const router = Router();
router
  .route("/:projectId")
  .get(verifyJWT, validateProjectPremission(AvalableUserRoles), getNotes)
  .post(
    verifyJWT,
    validateProjectPremission([UserRolesEnum.ADMIN]),
    createNotes
  );

router
  .route("/:projectId/n/:noteId")
  .put(verifyJWT, validateProjectPremission(UserRolesEnum.ADMIN), updateNotes)
  .get(verifyJWT, validateProjectPremission(AvalableUserRoles), getNotesId)
  .delete(
    verifyJWT,
    validateProjectPremission(UserRolesEnum.ADMIN),
    deleteNotes
  );
export default router;
