import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: false,
    },
    parsedData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    processingStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    processingError: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Resume", resumeSchema);
