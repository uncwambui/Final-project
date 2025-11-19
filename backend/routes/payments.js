import express from "express";
import {
  initiateMpesa,
  callbackHandler,
  getUserPayments,
} from "../controllers/paymentsController.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/mpesa/initiate", authenticate, initiateMpesa);
router.post("/mpesa/callback", callbackHandler); // no auth, Safaricom calls this
router.get("/user/:id", authenticate, getUserPayments);

export default router;
