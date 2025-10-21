import { Router } from "express";
import {regesterUser} from "../controllers/user.controller.js"
import {validate} from "../middlewares/validator.middleware.js"
import {userRegerstrationValidator} from "../validator/index.js"
const router = Router()
router.route("/regester").post( userRegerstrationValidator() , validate  , regesterUser);
export default router;











