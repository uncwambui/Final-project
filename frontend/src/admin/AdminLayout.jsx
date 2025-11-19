import { Link, Outlet } from "react-router-dom";
import { FaTrash, FaUsers, FaMoneyBill, FaChartLine, FaHome } from "react-icons/fa";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white p-6 flex flex-col shadow-xl">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4 text-lg">
          <Link to="/admin" className="flex items-center gap-3 hover:text-green-300">
            <FaHome /> Dashboard
          </Link>

          <Link to="/admin/requests" className="flex items-center gap-3 hover:text-green-300">
            <FaTrash /> Waste Requests
          </Link>

          <Link to="/admin/users" className="flex items-center gap-3 hover:text-green-300">
            <FaUsers /> Manage Users
          </Link>

          <Link to="/admin/payments" className="flex items-center gap-3 hover:text-green-300">
            <FaMoneyBill /> Payments
          </Link>

          <Link to="/admin/reports" className="flex items-center gap-3 hover:text-green-300">
            <FaChartLine /> Reports
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
