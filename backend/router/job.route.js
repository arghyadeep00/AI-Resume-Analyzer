import { Router } from "express";
import {
  postJob,
  deleteJob,
  updateJob,
  getJobs,
  getJobById,
} from "../controller/job.controller.js";
const router = Router();

router.post("/job-post", postJob);
router.get("/job-get", getJobs);
router.get("/job-get/:id", getJobById);
router.patch("/job-update/:id", updateJob);
router.delete("/job-delete/:id", deleteJob);

export default router;
