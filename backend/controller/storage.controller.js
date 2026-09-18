import asyncHandler from "../middleware/asyncHandler.js";
import Resume from "../models/Resume.js";
import fs from "fs";
import path from "path";


export const uploadResumes = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error("No files uploaded");
  }

  const { jobId } = req.body;

  const uploadedFiles = [];

  for (const file of req.files) {
    const resume = await Resume.create({
      fileName: file.filename,
      originalName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
      jobId: jobId || null,
    });
    uploadedFiles.push(resume);
  }

  res.status(201).json({
    message: `${uploadedFiles.length} resume(s) uploaded successfully`,
    files: uploadedFiles,
  });
});


export const getResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find().populate("jobId", "title department");
  res.status(200).json(resumes);
});


export const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  if (fs.existsSync(resume.filePath)) {
    fs.unlinkSync(resume.filePath);
  }

  await Resume.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Resume deleted successfully" });
});
