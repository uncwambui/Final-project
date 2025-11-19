import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Waste from "../models/WasteRequest.js";
import Reward from "../models/Reward.js";
import Payment from "../models/Payment.js";
import Report from "../models/Report.js";

const router = express.Router();

// GET /api/dashboard
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const wasteCount = await Waste.countDocuments({ user: userId });
    const rewardsTotal = await Reward.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$points" } } },
    ]);
    const paymentsTotal = await Payment.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const reportCount = await Report.countDocuments({ user: userId });

    res.json({
      wasteRequests: wasteCount,
      rewards: rewardsTotal[0]?.total || 0,
      payments: paymentsTotal[0]?.total || 0,
      reports: reportCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
});

export default router;
