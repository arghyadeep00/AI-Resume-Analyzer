import asyncHandler from "../middleware/asyncHandler.js";
import Resume from "../models/Resume.js";
import fs from "fs";
import path from "path";
import unzipper from "unzipper";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads");

export const uploadResumes = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error("No files uploaded");
  }

  const { jobId } = req.body;

  const uploadedFiles = [];

  for (const file of req.files) {
    const isZip = file.mimetype.includes("zip");

    if (isZip) {
      try {
        const directory = await unzipper.Open.file(file.path);

        for (const entry of directory.files) {
          if (
            entry.type === "Directory" ||
            !entry.path.toLowerCase().endsWith(".pdf")
          ) {
            continue;
          }

          const content = await entry.buffer();
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const newFilename = "resume-" + uniqueSuffix + ".pdf";
          const newPath = path.join(uploadDir, newFilename);

          fs.writeFileSync(newPath, content);

          const resume = await Resume.create({
            userId: req.user.id,
            fileName: newFilename,
            originalName: path.basename(entry.path),
            filePath: newPath,
            fileSize: content.length,
            mimeType: "application/pdf",
            jobId: jobId || null,
          });

          uploadedFiles.push(resume);
        }

        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (error) {
        console.error("Error processing zip file:", error);
      }
    } else {
      const resume = await Resume.create({
        userId: req.user.id,
        fileName: file.filename,
        originalName: file.originalname,
        filePath: file.path,
        fileSize: file.size,
        mimeType: file.mimetype,
        jobId: jobId || null,
      });
      uploadedFiles.push(resume);
    }
  }

  res.status(201).json({
    message: `${uploadedFiles.length} resume(s) processed and uploaded successfully`,
    files: uploadedFiles,
  });
});

export const getResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ userId: req.user.id }).populate(
    "jobId",
    "title department",
  );
  res.status(200).json(resumes);
});

export const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found or unauthorized");
  }

  if (fs.existsSync(resume.filePath)) {
    fs.unlinkSync(resume.filePath);
  }

  await Resume.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Resume deleted successfully" });
});
