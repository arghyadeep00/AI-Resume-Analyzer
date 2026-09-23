import { Router } from "express";
import {
  analyzeSingleResume,
  getAnalysisById,
  getAnalyses,
} from "../controller/analysis.controller.js";
import { auth, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, authorize("recruiter"), getAnalyses);
router.post("/", auth, authorize("recruiter"), analyzeSingleResume);
router.get("/:id", auth, authorize("recruiter"), getAnalysisById);

export default router;
