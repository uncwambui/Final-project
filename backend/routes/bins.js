import express from "express";
import { getBins, updateBin } from "../controllers/binsController.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getBins);
router.put("/:id", authenticate, updateBin);

export default router;
