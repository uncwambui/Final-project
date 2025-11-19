import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    API.get("/payments/all").then((res) => setPayments(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">Payments</h1>

      <table className="w-full bg-white shadow-lg rounded-xl">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="border text-center">
              <td className="p-3">{p.user_id}</td>
              <td className="p-3">{p.phone}</td>
              <td className="p-3">{p.amount}</td>
              <td className="p-3">{p.status}</td>
              <td className="p-3">{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
