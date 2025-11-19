import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaMoneyBill, FaListAlt, FaChartLine } from "react-icons/fa";

export default function AdminSidebar() {
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-green-700";

  const activeClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg bg-green-800 text-white";

  return (
    <div className="h-full w-64 bg-green-900 text-white fixed left-0 top-0 p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-10 tracking-wide">SmartWaste Admin</h2>

      <nav className="space-y-3">
        <NavLink to="/admin" end className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink to="/admin/requests" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          <FaListAlt /> Manage Requests
        </NavLink>

        <NavLink to="/admin/users" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          <FaUsers /> Manage Users
        </NavLink>

        <NavLink to="/admin/payments" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          <FaMoneyBill /> Payments
        </NavLink>

        <NavLink to="/admin/reports" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          <FaChartLine /> Reports
        </NavLink>
      </nav>
    </div>
  );
}
