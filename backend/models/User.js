// src/backend/models/User.js  (or backend/models/User.js)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: "user" }, // 'user' | 'admin' | 'officer'
  location: { type: String },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
