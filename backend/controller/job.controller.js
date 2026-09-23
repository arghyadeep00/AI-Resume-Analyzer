import asyncHandler from "../middleware/asyncHandler.js";
import Job from "../models/Job.js";
import { parseJobDescription } from "../services/ai/jobAnalyzer.js";

export const postJob = asyncHandler(async (req, res) => {
  const {
    title,
    department,
    employmentType,
    description,
    location,
    skills,
    experienceYears,
  } = req.body;

  if (!title || !department || !employmentType || !description || !skills) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  let parsedData = {};
  try {
    parsedData = await parseJobDescription(description, title);
  } catch (error) {
    console.error("AI parsing failed during job creation:", error);
  }

  const job = new Job({
    userId: req.user.id,
    title,
    department,
    employmentType,
    description,
    location,
    skills,
    experienceYears,
    parsedData,
  });
  await job.save();
  res.status(201).json({ message: "Job posted successfully", job });
});

export const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ userId: req.user.id });
  res.status(200).json(jobs);
});

export const getJobById = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findOne({ _id: jobId, userId: req.user.id });

  if (!job) {
    res.status(404);
    throw new Error("Job not found or unauthorized");
  }

  res.status(200).json(job);
});

export const updateJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const {
    title,
    department,
    employmentType,
    description,
    location,
    skills,
    experienceYears,
  } = req.body;

  const job = await Job.findOneAndUpdate(
    { _id: jobId, userId: req.user.id },
    {
      title,
      department,
      employmentType,
      description,
      location,
      skills,
      experienceYears,
    },
    { new: true },
  );

  if (!job) {
    res.status(404);
    throw new Error("Job not found or unauthorized");
  }
  res.status(200).json({ message: "Job updated successfully" });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findOneAndDelete({ _id: jobId, userId: req.user.id });

  if (!job) {
    res.status(404);
    throw new Error("Job not found or unauthorized");
  }

  res.status(200).json({ message: "Job deleted successfully" });
});
