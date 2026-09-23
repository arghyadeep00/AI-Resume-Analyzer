import { Router } from "express";
import upload from "../middleware/upload.js";
import { uploadResumes, getResumes, deleteResume } from "../controller/storage.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/upload", auth, upload.array("resumes", 10), uploadResumes);
router.get("/resumes", auth, getResumes);
router.delete("/resume/:id", auth, deleteResume);

export default router;