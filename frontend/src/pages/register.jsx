import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to the server");
  }
};



  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          Create Account
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-3 focus:outline-green-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3 focus:outline-green-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4 focus:outline-green-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-700 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
