import { Router } from "express";
import { analyzeSingleResume, getAnalysisById, getAnalyses } from "../controller/analysis.controller.js";

const router = Router();

router.get("/", getAnalyses);
router.post("/", analyzeSingleResume);
router.get("/:id", getAnalysisById);

export default router;
