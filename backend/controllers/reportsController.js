import WasteRequest from "../models/WasteRequest.js";
import Report from "../models/Report.js";

// --- Admin only ---
export const generateReport = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ error: "Forbidden" });

    const totalWaste = await WasteRequest.countDocuments();
    const recyclableWaste = await WasteRequest.countDocuments({
      waste_type: "recyclable",
    });

    const report = await Report.create({
      generated_by: req.user.id,
      total_waste: totalWaste,
      recyclable_percentage: totalWaste
        ? (recyclableWaste / totalWaste) * 100
        : 0,
      households_reached: 10, // placeholder
    });

    res.json({ message: "Report generated", report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Admin: all reports | User: summary only ---
export const getReports = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const reports = await Report.find().sort({ createdAt: -1 });
      return res.json(reports);
    }

    // Non-admin summary
    const totalWaste = await WasteRequest.countDocuments({
      user: req.user._id,
    });
    const recyclableWaste = await WasteRequest.countDocuments({
      user: req.user._id,
      waste_type: "recyclable",
    });

    return res.json([
      {
        summary_for: req.user.name,
        total_waste: totalWaste,
        recyclable_percentage: totalWaste
          ? (recyclableWaste / totalWaste) * 100
          : 0,
        households_reached: 1,
      },
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
