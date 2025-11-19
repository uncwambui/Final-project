import { FaSignOutAlt } from "react-icons/fa";

export default function AdminTopbar() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // redirect to login
    window.location.href = "/login";
  };

  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6 fixed top-0 left-64 z-20">
      <h2 className="text-xl font-semibold">Admin Panel</h2>
      <button
        onClick={logout}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
