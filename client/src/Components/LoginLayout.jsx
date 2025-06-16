import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function LoginLayout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.password.trim()) errors.password = "Password is required.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard", { state: { user: data.user } });
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Branding with Gradient */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#2D9596] to-[#265073] text-white flex items-center justify-center p-10">
        <div>
          <h1 className="text-5xl font-bold mb-4">Proxima Centauri</h1>
          <p className="text-lg text-gray-200">
            Empowering your groups. Secure. Reliable. Simple.
          </p>
        </div>
      </div>

      {/* Right: Login Form with Gradient Background */}
      <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#ECF4D6] to-[#9AD0C2] p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full"
        >
          {/* Icon Inside Card */}
          <div className="flex justify-center mb-4">
            <FaUserCircle className="text-6xl text-[#2D9596]" />
          </div>

          <h2 className="text-3xl font-bold text-center text-[#265073] mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-[#2D9596] mb-6">Login to your Proxima account</p>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-[#2D9596] font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-[#2D9596]"
              }`}
              placeholder="Enter your email"
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-[#2D9596] font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-[#2D9596]"
              }`}
              placeholder="Enter your password"
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
            )}
          </div>

          {/* General Error */}
          {error && (
            <p className="text-red-600 text-center text-sm mb-4">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#265073] text-white py-2 rounded-lg hover:bg-[#2D9596] transition font-medium text-lg"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="mt-4 text-sm text-center text-[#2D9596]">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#265073] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginLayout;
