import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-green-700";
  const activeClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg bg-green-800 text-white";

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-900 text-white p-6 shadow-xl transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 md:translate-x-0 md:static`}
      >
        <h2 className="text-2xl font-bold mb-10 tracking-wide">SmartWaste Admin</h2>

        <nav className="space-y-3">
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/requests" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            Manage Requests
          </NavLink>

          <NavLink to="/admin/users" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            Manage Users
          </NavLink>

          <NavLink to="/admin/payments" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            Payments
          </NavLink>

          <NavLink to="/admin/reports" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            Reports
          </NavLink>
        </nav>
      </div>
    </>
  );
}
