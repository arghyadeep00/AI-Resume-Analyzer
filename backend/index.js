import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import jobRoutes from "./router/job.route.js";
import storageRoutes from "./router/storage.route.js";
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

import userRoutes from "./router/user.route.js";
import cookieParser from "cookie-parser";
import analysisRoutes from "./router/analysis.route.js";

connectDB();

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api/analysis", analysisRoutes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
