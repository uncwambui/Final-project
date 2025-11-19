import Payment from "../models/Payment.js";

export const initiateMpesa = async (req, res) => {
  try {
    const { request_id, amount } = req.body;
    const payment = await Payment.create({
      user: req.user.id,
      request: request_id,
      amount,
      status: "pending",
    });

    // Simulate M-Pesa STK
    res.json({ message: "Mock STK Push initiated", payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const callbackHandler = async (req, res) => {
  try {
    const { paymentId, status } = req.body;
    const updated = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });
    res.json({ message: "Callback processed", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
