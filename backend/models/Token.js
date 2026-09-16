import mongoose from "mongoose";

const refreshSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Refresh = mongoose.model("Refresh", refreshSchema);

export default Refresh;
