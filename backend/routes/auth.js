import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticate, getMe); // ✅ add this

export default router;
