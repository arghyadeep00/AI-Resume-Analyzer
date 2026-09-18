import asyncHandler from "../middleware/asyncHandler.js";
import Job from "../models/Job.js";

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

  const job = new Job({
    title,
    department,
    employmentType,
    description,
    location,
    skills,
    experienceYears,
  });
  await job.save();
  res.status(201).json({ message: "Job posted successfully" });
});

export const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
});

export const getJobById = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
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

  const job = await Job.findByIdAndUpdate(
    jobId,
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
    throw new Error("Job not found");
  }
  res.status(200).json({ message: "Job updated successfully" });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findByIdAndDelete(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json({ message: "Job deleted successfully" });
});
