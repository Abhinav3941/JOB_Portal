import express from "express" ;

import isAuhtenticated from "../middewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updatestatus } from "../controller/application.controller.js"

const router = express.Router() ;


router.route("/apply/:id").get(isAuhtenticated ,applyJob);
router.route("/get").get(isAuhtenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuhtenticated,getApplicants);

router.route("/status/:id/update").post(isAuhtenticated , updatestatus);

export default router ;