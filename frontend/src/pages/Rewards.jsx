import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";
import api from "../services/api";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await api.get("/rewards/my-points");
        setRewards(res.data);
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
              <h3 className="text-lg font-semibold text-green-700">
                {reward.description}
              </h3>
              <p className="text-gray-600 text-sm">
                {new Date(reward.date).toLocaleDateString()}
              </p>
              <p className="text-green-700 font-bold text-xl mt-2">
                +{reward.points} pts
              </p>
            </div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500 text-sm">You don’t have any rewards yet.</p>
      )}
    </div>
  );
}
