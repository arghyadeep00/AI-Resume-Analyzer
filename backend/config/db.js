import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    dns.setServers(["8.8.8.8"]);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
