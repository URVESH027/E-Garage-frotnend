import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) return setError("Please enter your email");
    if (!password) return setError("Please enter your password");

    setLoading(true);

    try {
      const response = await api.post("/user/login", { email, password });
      const user = response.data?.user;

      if (!user) {
        throw new Error("User login failed");
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role || "user");

      if (user.role === "admin" || email === "admin@egarage.com") {
        navigate("/admin");
      } else {
        if (onLogin) onLogin({ email });
        navigate("/");
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setError("Backend server is not running on http://localhost:3000. Start the backend and try again.");
      } else {
        setError(err.response?.data?.message || "Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] px-6 py-8 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-[#111214] shadow-[0_30px_90px_rgba(0,0,0,0.4)] lg:grid-cols-[1.05fr_0.95fr]">
        <div
          className="relative overflow-hidden p-8 text-white sm:p-10 lg:p-12"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(7,7,9,0.5), rgba(7,7,9,0.82)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#ffb777]">
              E-Garage Access
            </p>
            <h1 className="mt-6 text-5xl leading-tight text-white sm:text-6xl">
              Sign in to manage bookings like a real service customer.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
              Access your appointments, payment flow, and vehicle service history through the
              upgraded customer experience.
            </p>
          </div>
        </div>

        <div className="bg-[linear-gradient(180deg,#17181c,#0f1013)] p-8 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#ff9d3f]">
              Welcome Back
            </p>
            <h2 className="mt-4 text-5xl font-black tracking-tight text-white">
              Login
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/62">
              Enter your details to continue into the E-Garage platform.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-white/75">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-[20px] border border-white/10 bg-white/6 px-4 py-3.5 text-white outline-none transition focus:border-[#ff7a00] focus:bg-white/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-bold text-white/75">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-[#ff9d3f] transition hover:text-[#ffb777]">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
              <Link to="/signup" className="text-[#ff9d3f] transition hover:text-[#ffb777]">
                Create an account
              </Link>
              <Link to="/" className="text-white/55 transition hover:text-white">
                Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
