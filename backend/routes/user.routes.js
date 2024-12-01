import express from "express" ;
import { login, logout, register, updateProfile } from "../controller/user.controller.js";
import isAuhtenticated from "../middewares/isAuthenticated.js";
import { singleUpload } from "../middewares/multer.js";

const router = express.Router() ;


router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuhtenticated , singleUpload,updateProfile);

export default router ;