import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const res = await API.get("/waste/my-requests"); // Replace when adding admin endpoint
    setRequests(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/waste/update-status/${id}`, { status });
    loadRequests();
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">Waste Requests</h1>

      <div className="space-y-6">
        {requests.map((req) => (
          <div className="bg-white shadow rounded-xl p-6 border" key={req.request_id}>
            <h3 className="text-xl font-bold">{req.waste_type}</h3>
            <p><b>Qty:</b> {req.quantity} kg</p>
            <p><b>Address:</b> {req.pickup_address}</p>
            <p><b>Status:</b> {req.status}</p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => updateStatus(req._id, "approved")}
                className="bg-green-700 text-white px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(req._id, "rejected")}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
