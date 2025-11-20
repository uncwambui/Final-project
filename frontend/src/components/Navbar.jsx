import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { FaRecycle } from "react-icons/fa";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        handleLogout();
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center space-x-2"
          onClick={() => setMenuOpen(false)}
        >
          <FaRecycle className="text-2xl text-white" />
          <span className="text-xl font-bold tracking-wide">SmartWaste</span>
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/dashboard" className="hover:text-green-200 transition">Dashboard</Link>
          <Link to="/rewards" className="hover:text-green-200 transition">Rewards</Link>
          <Link to="/waste-requests" className="hover:text-green-200 transition">Waste</Link>
          <Link to="/reports" className="hover:text-green-200 transition">Reports</Link>
          <Link to="/payments" className="hover:text-green-200 transition">Payments</Link>
        </div>

        {/* User (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-full">
              <div className="w-8 h-8 flex items-center justify-center bg-white text-green-700 font-bold rounded-full uppercase">
                {user.name?.charAt(0) || "U"}
              </div>
              <span className="text-sm">{user.name}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-green-100 transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 flex flex-col px-6 py-4 space-y-4 text-lg shadow-lg">
          <Link onClick={() => setMenuOpen(false)} to="/dashboard">Dashboard</Link>
          <Link onClick={() => setMenuOpen(false)} to="/rewards">Rewards</Link>
          <Link onClick={() => setMenuOpen(false)} to="/waste-requests">Waste</Link>
          <Link onClick={() => setMenuOpen(false)} to="/reports">Reports</Link>
          <Link onClick={() => setMenuOpen(false)} to="/payments">Payments</Link>

          {/* USER INFO (MOBILE) */}
          {user && (
            <div className="flex items-center space-x-3 mt-2">
              <div className="w-10 h-10 flex items-center justify-center bg-white text-green-700 font-bold rounded-full uppercase">
                {user.name?.charAt(0)}
              </div>
              <span className="text-white font-medium">{user.name}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-white text-green-700 mt-3 px-4 py-2 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
