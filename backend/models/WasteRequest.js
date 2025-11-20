import mongoose from "mongoose";

const wasteRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    waste_type: { type: String, required: true },
    quantity: { type: Number, required: true },
    pickup_address: { type: String, required: true },

    status: { type: String, default: "pending" }, // pending | in-progress | completed
    scheduled_date: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("WasteRequest", wasteRequestSchema);
