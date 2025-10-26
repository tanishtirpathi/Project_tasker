import { Router } from "express";
import UserRolesEnum from "../config/constants.js";
import validateProjectPremission from "../middlewares/auth.middleware.js";
const router = Router();
router
  .route("/:projectId")
  .get(
    validateProjectPremission([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]),
    getNotes
  )
  .post(validateProjectPremission([UserRolesEnum.ADMIN]), createNotes);
export default router;
