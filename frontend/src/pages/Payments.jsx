import React, { useState } from "react";
import api from "../services/api";

export default function Payments() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();

    if (!phone || !amount) {
      return alert("Please enter phone and amount.");
    }

    setLoading(true);

    try {
      await api.post("/payments/mpesa/initiate", { phone, amount });
      alert("Payment initiated! Check your M-Pesa phone.");
      setPhone("");
      setAmount("");
    } catch (error) {
      alert(error.response?.data?.error || "Payment failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        M-Pesa Payment
      </h2>

      <form onSubmit={handlePay} className="space-y-5">

        {/* Phone */}
        <div>
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="text"
            placeholder="e.g. 0712345678"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-semibold">Amount (KES)</label>
          <input
            type="number"
            placeholder="e.g. 150"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
        >
          {loading ? "Processing..." : "Pay with M-Pesa"}
        </button>
      </form>
    </div>
  );
}
