import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    generated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    total_waste: { type: Number },
    recyclable_percentage: { type: Number },
    households_reached: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
