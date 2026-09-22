import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  score: {
    type: Number,
    default: 0,
  },
  breakdown: {
    skills: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    responsibilities: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
    semantic: { type: Number, default: 0 },
  },
  matchedSkills: [String],
  missingSkills: [String],
  matchedResponsibilities: [String],
  missingResponsibilities: [String],
  experienceMatch: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  educationMatch: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  aiAnalysis: {
    summary: { type: String, default: "" },
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
  },
  error: {
    type: String,
    default: null,
  },
}, { timestamps: true });

analysisSchema.index({ userId: 1 });
analysisSchema.index({ jobId: 1 });
analysisSchema.index({ resumeId: 1 });

export default mongoose.model("Analysis", analysisSchema);
