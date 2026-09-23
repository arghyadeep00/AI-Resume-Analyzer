import { Router } from "express";
import {
  postJob,
  deleteJob,
  updateJob,
  getJobs,
  getJobById,
} from "../controller/job.controller.js";
import { auth, authorize } from "../middleware/auth.js";
const router = Router();

router.post("/job-post", auth, authorize("recruiter"), postJob);
router.get("/job-get", auth, authorize("recruiter"), getJobs);
router.get("/job-get/:id", auth, authorize("recruiter"), getJobById);
router.patch("/job-update/:id", auth, authorize("recruiter"), updateJob);
router.delete("/job-delete/:id", auth, authorize("recruiter"), deleteJob);

export default router;
