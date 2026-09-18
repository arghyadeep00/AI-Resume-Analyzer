import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
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
});

export default mongoose.model("Job", jobSchema);
