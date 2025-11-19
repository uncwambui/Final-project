// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import wasteRoutes from "./routes/waste.js";
import binRoutes from "./routes/bins.js";
import rewardRoutes from "./routes/rewards.js";
import reportRoutes from "./routes/reports.js";
import paymentRoutes from "./routes/payments.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/bins", binRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
