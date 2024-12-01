import express from "express" ;

import isAuhtenticated from "../middewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";

const router = express.Router() ;


router.route("/post").post(isAuhtenticated ,postJob);
router.route("/get").get(isAuhtenticated ,getAllJobs);
router.route("/getadminjobs").get(isAuhtenticated ,getAdminJobs);
router.route("/get/:id").get(isAuhtenticated ,getJobById);


export default router ;