import asyncHandler from "../middleware/asyncHandler.js";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js";
import Analysis from "../models/Analysis.js";
import { extractResumeText } from "../services/resumeParser.js";
import { parseResumeText } from "../services/ai/resumeAnalyzer.js";
import { calculateMatch } from "../services/matchingEngine.js";
import { generateExplanation } from "../services/ai/explanationGenerator.js";
import fs from "fs";

export const analyzeSingleResume = asyncHandler(async (req, res) => {
  const { resumeId, jobId } = req.body;

  if (!resumeId || !jobId) {
    res.status(400);
    throw new Error("resumeId and jobId are required");
  }

  const job = await Job.findOne({ _id: jobId, userId: req.user.id });
  const resume = await Resume.findOne({ _id: resumeId, userId: req.user.id });

  if (!job) {
    res.status(404);
    throw new Error("Job not found or unauthorized");
  }
  if (!resume) {
    res.status(404);
    throw new Error("Resume not found or unauthorized");
  }

  if (!fs.existsSync(resume.filePath)) {
    res.status(404);
    throw new Error("Resume file not found on disk");
  }

  let analysis = await Analysis.findOne({ jobId, resumeId, userId: req.user.id });
  if (analysis && analysis.status === "completed") {
    const populated = await Analysis.findById(analysis._id)
      .populate("jobId")
      .populate("resumeId");
    return res.status(200).json(populated);
  }

  if (!analysis) {
    analysis = await Analysis.create({ jobId, resumeId, userId: req.user.id, status: "pending" });
  }

  try {
    if (!resume.parsedData) {
      const extracted = await extractResumeText(resume.filePath);
      const parsedData = await parseResumeText(extracted.text);
      resume.parsedData = parsedData;
      resume.processingStatus = "completed";
      await resume.save();
    }

    if (
      !job.parsedData ||
      !job.parsedData.requiredSkills ||
      job.parsedData.requiredSkills.length === 0
    ) {
      job.parsedData = {
        requiredSkills: job.skills || [],
        preferredSkills: [],
        requiredExperienceYears: job.experienceYears || 0,
        responsibilities: [],
        technologies: [],
      };
    }

    const matchResult = calculateMatch(resume.parsedData, job.parsedData);

    const explanation = await generateExplanation({
      ...matchResult,
      jobTitle: job.title,
      candidateName: resume.parsedData?.personal?.name || resume.originalName,
    });

    analysis.status = "completed";
    analysis.score = matchResult.score;
    analysis.breakdown = matchResult.breakdown;
    analysis.matchedSkills = matchResult.matchedSkills;
    analysis.missingSkills = matchResult.missingSkills;
    analysis.matchedResponsibilities = matchResult.matchedResponsibilities;
    analysis.missingResponsibilities = matchResult.missingResponsibilities;
    analysis.experienceMatch = matchResult.experienceMatch;
    analysis.educationMatch = matchResult.educationMatch;
    analysis.aiAnalysis = explanation;
    await analysis.save();

    const populated = await Analysis.findById(analysis._id)
      .populate("jobId")
      .populate("resumeId");

    res.status(200).json(populated);
  } catch (error) {
    console.error("Analysis failed:", error);
    analysis.status = "failed";
    analysis.error = error.message;
    await analysis.save();
    res.status(500);
    throw new Error(`Analysis failed: ${error.message}`);
  }
});

export const getAnalyses = asyncHandler(async (req, res) => {
  const query = { status: "completed", userId: req.user.id };
  if (req.query.jobId) {
    query.jobId = req.query.jobId;
  }

  const analyses = await Analysis.find(query)
    .populate("jobId", "title department employmentType")
    .populate("resumeId", "originalName parsedData")
    .sort({ createdAt: -1 });

  res.status(200).json(analyses);
});

export const getAnalysisById = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({ _id: req.params.id, userId: req.user.id })
    .populate("jobId")
    .populate("resumeId");

  if (!analysis) {
    res.status(404);
    throw new Error("Analysis not found or unauthorized");
  }

  res.status(200).json(analysis);
});
