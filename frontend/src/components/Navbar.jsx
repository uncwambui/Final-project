import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { FaRecycle } from "react-icons/fa";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        // If the token is invalid, logout user
        handleLogout();
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <FaRecycle className="text-2xl text-white" />
          <span className="text-xl font-bold tracking-wide">SmartWaste</span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/dashboard" className="hover:text-green-200 transition">
            Dashboard
          </Link>
          <Link to="/rewards" className="hover:text-green-200 transition">
            Rewards
          </Link>
          <Link to="/waste-requests" className="hover:text-green-200 transition">
            Waste
          </Link>
          <Link to="/reports" className="hover:text-green-200 transition">
            Reports
          </Link>
          <Link to="/payments" className="hover:text-green-200 transition">
            Payments
          </Link>
        </div>

        {/* Right: User Info */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-full">
                <div className="w-8 h-8 flex items-center justify-center bg-white text-green-700 font-bold rounded-full uppercase">
                  {user.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-green-100 transition text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-green-100 transition text-sm font-medium"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
