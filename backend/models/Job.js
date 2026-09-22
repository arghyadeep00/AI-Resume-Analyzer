import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  company: {
    type: String,
    default: "Unknown Company",
  },
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: null,
  },
  experienceYears: {
    type: Number,
    default: 0,
  },
  skills: {
    type: [String],
    required: true,
  },
  parsedData: {
    requiredSkills: [String],
    preferredSkills: [String],
    requiredExperienceYears: { type: Number, default: 0 },
    educationRequirements: [String],
    responsibilities: [String],
    technologies: [String]
  }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
