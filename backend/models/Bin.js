import mongoose from "mongoose";

const binSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    current_level: { type: Number, default: 0 }, // percentage or litres
    status: { type: String, default: "active" }, // active / full / maintenance
  },
  { timestamps: true }
);

export default mongoose.model("Bin", binSchema);
