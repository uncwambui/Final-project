import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGift, FaMedal } from "react-icons/fa";
import api from "../services/api";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await api.get("/rewards/my-points");
        setRewards(res.data);
        setTotal(res.data.reduce((sum, r) => sum + r.points, 0));
      } catch (err) {
        console.error("Error loading rewards:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <p className="text-green-600 animate-pulse">Loading your rewards...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
        <FaGift className="text-green-600" /> My Rewards
      </h1>

      {/* Total Points */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 border-l-4 border-green-600">
        <h2 className="text-xl font-semibold">Total Points Earned</h2>
        <p className="text-5xl font-bold text-green-700">{total}</p>
      </div>

      {/* Leaderboard */}
      <h2 className="text-2xl font-semibold mb-3 flex gap-2 items-center">
        <FaMedal className="text-yellow-500" /> Your Achievements
      </h2>
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <ul className="space-y-3">
          <li>🏅 Bronze Recycler – 100 pts</li>
          <li>🥈 Silver Recycler – 300 pts</li>
          <li>🥇 Gold Recycler – 600 pts</li>
          <li>💎 Eco Champion – 1000 pts</li>
        </ul>
      </div>

      {/* Reward History */}
      {rewards.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rewards.map((reward, i) => (
            <div
              key={i}
              className="bg-white shadow-md p-4 rounded-xl border-l-4 border-green-600"
            >
              <h3 className="text-lg font-semibold text-green-700">{reward.description}</h3>
              <p className="text-gray-600 text-sm">{new Date(reward.date).toLocaleDateString()}</p>
              <p className="text-green-700 font-bold text-2xl mt-2">+{reward.points} pts</p>
            </div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500">You don’t have any rewards yet.</p>
      )}
    </div>
  );
}
    