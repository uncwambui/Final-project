// 🧠 React & Hooks
import { useEffect, useState } from "react";

// 🎨 Animations & Icons
import { motion } from "framer-motion";
import { FaRecycle, FaGift, FaMoneyBillWave, FaFileAlt } from "react-icons/fa";

// 📊 Data & Charts
import axios from "axios"; // ✅ optional, since api service already uses axios
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// 🧩 Local Imports
import api from "../services/api";
import Logo from "../components/Logo";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token) {
          console.error("No token found. Please login again.");
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [userRes, wasteRes, rewardsRes, paymentRes, reportsRes] =
          await Promise.all([
            api.get("/auth/me", config),
            api.get("/waste/my-requests", config),
            api.get("/rewards/my-points", config),
            api.get(`/payments/user/${userId}`, config),
            api.get("/reports", config),
          ]);

        setUser(userRes.data);

        // 🧮 Compute dashboard stats
        const totalWaste = wasteRes.data.length;
        const totalRewards = rewardsRes.data.reduce((sum, r) => sum + (r.points || 0), 0);
        const totalPayments = paymentRes.data.reduce((sum, p) => sum + (p.amount || 0), 0);
        const totalReports = reportsRes.data.length;

        setStats({
          waste: totalWaste,
          rewards: totalRewards,
          payments: totalPayments,
          reports: totalReports,
          recentRequests: wasteRes.data.slice(-3).reverse(),
        });
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <p className="text-green-600 text-lg animate-pulse">
          Loading SmartWaste dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <h1 className="text-2xl md:text-3xl font-bold text-green-700">
            Welcome back, {user?.name || "User"} 👋
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<FaRecycle />} title="Waste Requests" value={stats?.waste ?? 0} color="green" />
          <StatCard icon={<FaGift />} title="Rewards Earned" value={`${stats?.rewards ?? 0} pts`} color="blue" />
          <StatCard icon={<FaMoneyBillWave />} title="Payments" value={`Ksh ${stats?.payments ?? 0}`} color="yellow" />
          <StatCard icon={<FaFileAlt />} title="Reports" value={stats?.reports ?? 0} color="red" />
        </div>

        {/* Waste Trends Chart */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Waste Collection Trends</h2>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.recentRequests || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Notifications */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Announcements</h2>
          <ul className="space-y-3">
            <li className="bg-green-50 border-l-4 border-green-600 p-3 rounded-lg">
              🚛 Waste collection for Zone A scheduled tomorrow.
            </li>
            <li className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-lg">
              ⚙️ System maintenance on Sunday 10PM - 12AM.
            </li>
          </ul>
        </section>

        {/* Recent Requests */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Recent Waste Collection Requests</h2>
          {stats?.recentRequests?.length > 0 ? (
            <ul className="space-y-3">
              {stats.recentRequests.map((req, i) => (
                <motion.li
                  key={i}
                  className="bg-white p-4 shadow-sm rounded-lg border-l-4 border-green-600 hover:shadow-md transition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-gray-700">
                    {req.location || "Unknown"} —{" "}
                    <span className="font-medium text-green-700">
                      {req.status || "Pending"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {req.date ? new Date(req.date).toLocaleDateString() : "N/A"}
                  </p>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No recent requests found.</p>
          )}
        </section>
      </main>
    </div>
  );
}

// 🧮 Reusable Stat Card Component
function StatCard({ title, value, color, icon }) {
  const colorStyles = {
    green: "border-green-600 text-green-700 bg-green-50",
    blue: "border-blue-600 text-blue-700 bg-blue-50",
    yellow: "border-yellow-600 text-yellow-700 bg-yellow-50",
    red: "border-red-600 text-red-700 bg-red-50",
  }[color];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-start justify-center p-6 rounded-2xl shadow-md border-t-4 ${colorStyles}`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
}
