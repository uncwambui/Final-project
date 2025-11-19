import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/auth/all-users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">Users</h1>

      <table className="w-full bg-white shadow-lg rounded-xl">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border text-center">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
