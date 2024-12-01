import express from "express" ;
import { registerCompany, getcomapany, getCompanyById, updateCompany } from "../controller/company.controller.js";
import isAuhtenticated from "../middewares/isAuthenticated.js";
import { singleUpload } from "../middewares/multer.js";

const router = express.Router() ;


router.route("/register").post(isAuhtenticated ,registerCompany);
router.route("/get").get(isAuhtenticated,getcomapany);
router.route("/get/:id").get(isAuhtenticated,getCompanyById);

router.route("/update/:id").put(isAuhtenticated ,singleUpload ,updateCompany);

export default router ;