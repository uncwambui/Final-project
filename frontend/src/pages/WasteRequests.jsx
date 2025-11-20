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

  // Load user requests
  const loadRequests = async () => {
    try {
      const res = await API.get("/waste/my-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load requests:", err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // Submit request
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

  // Delete a request
  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      await API.delete(`/waste/${id}`);
      alert("Request deleted");
      loadRequests();
    } catch (err) {
      alert("Delete failed — only admins or request owners can delete.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 mb-20 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-green-800"
      >
        Waste Collection Requests
      </motion.h1>

      {/* Form Section */}
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
            required
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
            required
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
            required
          />
        </div>

        <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition shadow">
          Submit Request
        </button>
      </motion.form>

      {/* My Requests */}
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">My Requests</h2>

      {requests.length === 0 && (
        <p className="text-gray-500">You have no waste requests yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {requests.map((r) => (
          <motion.div
            key={r._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border shadow rounded-xl p-6 relative"
          >
            {/* Delete Button */}
            <button
              onClick={() => deleteRequest(r._id)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg font-bold text-gray-800">{r.waste_type}</h3>
            </div>

            <p className="text-gray-700">
              <b>Quantity:</b> {r.quantity} kg
            </p>

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
