import { Router } from "express";
import upload from "../middleware/upload.js";
import { uploadResumes, getResumes, deleteResume } from "../controller/storage.controller.js";

const router = Router();

router.post("/upload", upload.array("resumes", 10), uploadResumes);
router.get("/resumes", getResumes);
router.delete("/resume/:id", deleteResume);

export default router;