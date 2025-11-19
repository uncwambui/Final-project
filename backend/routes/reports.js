import express from "express";
import {
  generateReport,
  getReports,
} from "../controllers/reportsController.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/generate", authenticate, generateReport);
router.get("/", authenticate, getReports);

export default router;
