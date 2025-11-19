import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaTrash, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function WasteRequests() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    waste_type: "",
    quantity: "",
    pickup_address: "",
  });

  const loadRequests = async () => {
    const res = await API.get("/waste/my-requests");
    setRequests(res.data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/waste/request", form);

      alert("Waste request submitted successfully! ♻️");

      setForm({ waste_type: "", quantity: "", pickup_address: "" });
      loadRequests();
    } catch (err) {
      alert(err.response?.data?.error || "Error submitting request");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 mb-20">

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-green-800"
      >
        Waste Collection Requests
      </motion.h1>

      {/* Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8 mb-12 border border-gray-100 space-y-5"
      >
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Waste Type</label>
          <input
            type="text"
            placeholder="Plastic, Organic, E-waste..."
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            value={form.waste_type}
            onChange={(e) => setForm({ ...form, waste_type: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Quantity (kg)</label>
          <input
            type="number"
            placeholder="e.g. 10"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Pickup Address</label>
          <input
            type="text"
            placeholder="Nairobi, Kenya"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            value={form.pickup_address}
            onChange={(e) =>
              setForm({ ...form, pickup_address: e.target.value })
            }
          />
        </div>

        <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition shadow">
          Submit Request
        </button>
      </motion.form>

      {/* Requests List */}
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">My Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {requests.map((r) => (
          <motion.div
            key={r.request_id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border shadow rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaTrash className="text-green-700 text-xl" />
              <h3 className="text-lg font-bold text-gray-800">{r.waste_type}</h3>
            </div>

            <p className="text-gray-700"><b>Quantity:</b> {r.quantity} kg</p>

            <p className="flex items-center gap-2 mt-2 text-gray-700">
              <FaMapMarkerAlt className="text-green-600" />
              {r.pickup_address}
            </p>

            <p className="flex items-center gap-2 mt-2 text-gray-700">
              <FaClock className="text-yellow-600" />
              <span className="font-medium">Status:</span>
              <span
                className={
                  r.status === "pending"
                    ? "text-yellow-600"
                    : r.status === "completed"
                    ? "text-green-700"
                    : "text-blue-700"
                }
              >
                {r.status}
              </span>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
