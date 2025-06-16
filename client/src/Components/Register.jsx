import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "", // Updated to match backend
    password: "",
    role: "member",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed.");
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#ecf4d6] to-[#9ad0c2]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-[#265073] mb-6">
          Create Account
        </h2>

        <div className="mb-4">
          <label className="block text-[#2d9596] font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d9596]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#2d9596] font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d9596]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#2d9596] font-medium mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number" // Updated
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d9596]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#2d9596] font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d9596]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#265073] text-white py-2 rounded-lg hover:bg-[#2d9596] transition font-medium text-lg"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center text-[#2d9596]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#265073] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
