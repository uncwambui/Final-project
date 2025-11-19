import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Rewards from "./pages/Rewards";
import WasteRequests from "./pages/WasteRequests";
import Reports from "./pages/Reports";
import Payments from "./pages/Payments";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ADMIN IMPORTS
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageRequests from "./admin/pages/ManageRequests";
import ManageUsers from "./admin/pages/ManageUsers";
import ManagePayments from "./admin/pages/ManagePayments";
import AdminReports from "./admin/pages/AdminReports";
import AdminRoute from "./components/AdminRoute";

function AppContent() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Hide Navbar + Footer on login pages
  const hideLayout = ["/", "/login", "/register"].includes(location.pathname);

  // Hide navbar + footer for admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Navbar only for authenticated user pages */}
      {!hideLayout && !isAdminPage && token && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rewards"
          element={
            <ProtectedRoute>
              <Rewards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/waste-requests"
          element={
            <ProtectedRoute>
              <WasteRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />

        {/* ============================
              ADMIN ROUTES
           ============================ */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="requests" element={<ManageRequests />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="payments" element={<ManagePayments />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
      </Routes>

      {/* Footer visible only for normal logged-in users */}
      {!hideLayout && !isAdminPage && token && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
