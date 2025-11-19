import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    request: { type: mongoose.Schema.Types.ObjectId, ref: "WasteRequest" },
    amount: { type: Number, required: true },
    method: { type: String, default: "mpesa" },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
