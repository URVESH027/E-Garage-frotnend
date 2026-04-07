import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.lastName) return setError("Please enter your full name");
    if (!formData.email) return setError("Please enter an email");
    if (!formData.password) return setError("Please enter a password");
    if (formData.password.length < 6) return setError("Password must be at least 6 characters");

    setLoading(true);

    try {
      const response = await api.post("/user/create", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      const savedUser = response.data?.savedUser;

      if (!savedUser) {
        throw new Error("User was not created");
      }

      const activeUser = {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        role: savedUser.role || "user",
      };

      localStorage.setItem("user", JSON.stringify(activeUser));
      localStorage.setItem("role", activeUser.role);

      if (onSignup) onSignup({ email: formData.email });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] px-6 py-8 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-[#111214] shadow-[0_30px_90px_rgba(0,0,0,0.4)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-[linear-gradient(180deg,#17181c,#0f1013)] p-8 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#ff9d3f]">
              Create Account
            </p>
            <h2 className="mt-4 text-5xl font-black tracking-tight text-white">
              Join E-Garage
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/62">
              Create your profile and start booking workshop visits with the upgraded interface.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-white/75">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full rounded-[20px] border border-white/10 bg-white/6 px-4 py-3.5 text-white outline-none transition focus:border-[#ff7a00] focus:bg-white/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-white/75">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full rounded-[20px] border border-white/10 bg-white/6 px-4 py-3.5 text-white outline-none transition focus:border-[#ff7a00] focus:bg-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/75">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full rounded-[20px] border border-white/10 bg-white/6 px-4 py-3.5 text-white outline-none transition focus:border-[#ff7a00] focus:bg-white/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/75">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="w-full rounded-[20px] border border-white/10 bg-white/6 px-4 py-3.5 text-white outline-none transition focus:border-[#ff7a00] focus:bg-white/10"
                />
              </div>

              {error && (
                <div className="rounded-[20px] bg-rose-500/12 px-4 py-3 text-sm font-bold text-rose-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="garage-button rounded-xl px-6 py-3.5 text-sm font-bold text-white disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
              <Link to="/login" className="text-[#ff9d3f] transition hover:text-[#ffb777]">
                Already have an account?
              </Link>
              <Link to="/" className="text-white/55 transition hover:text-white">
                Back to website
              </Link>
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden p-8 text-white sm:p-10 lg:p-12"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(7,7,9,0.45), rgba(7,7,9,0.84)), url('https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#ffb777]">
              Member Benefits
            </p>
            <h1 className="mt-6 text-5xl font-black leading-tight sm:text-6xl">
              Create your profile and keep every service in one place.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
              Once signed up, your account is created in the backend and can be used for
              real bookings tied to your saved profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
