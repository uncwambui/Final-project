import express from "express";
import {
  createRequest,
  myRequests,
  updateStatus,
  deleteRequest,   // ✅ ADD THIS
} from "../controllers/wasteController.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/request", authenticate, createRequest); // create new request
router.get("/my-requests", authenticate, myRequests); // view my requests
router.put("/update-status/:id", authenticate, updateStatus); // officer/admin updates

// ✅ DELETE REQUEST — owner or admin only
router.delete("/:id", authenticate, deleteRequest);

export default router;
