import express from "express";
import { myRewards } from "../controllers/rewardsController.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.get("/my-points", authenticate, myRewards);

export default router;
