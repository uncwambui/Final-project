export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">
        Welcome! Manage waste requests, users, payments and reports.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="p-6 bg-white shadow-lg rounded-xl border">
          <h3 className="text-xl font-semibold">Total Requests</h3>
          <p className="text-3xl font-bold text-green-700">–</p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl border">
          <h3 className="text-xl font-semibold">Users</h3>
          <p className="text-3xl font-bold text-green-700">–</p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl border">
          <h3 className="text-xl font-semibold">Payments</h3>
          <p className="text-3xl font-bold text-green-700">–</p>
        </div>

      </div>
    </div>
  );
}
