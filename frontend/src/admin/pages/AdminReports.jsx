import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    API.get("/reports").then((res) => setReports(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">Reports</h1>

      <table className="w-full bg-white shadow-lg rounded-xl">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-3">Total Waste</th>
            <th className="p-3">Recyclable %</th>
            <th className="p-3">Households</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((r) => (
            <tr key={r._id} className="border text-center">
              <td className="p-3">{r.total_waste}</td>
              <td className="p-3">{r.recyclable_percentage}%</td>
              <td className="p-3">{r.households_reached}</td>
              <td className="p-3">
                {new Date(r.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
