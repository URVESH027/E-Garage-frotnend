import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../lib/api";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const password = watch("password");

  const submitHandler = async (data) => {
    setLoading(true);
    setMessage("");
    setErrorMsg("");

    try {
      const res = await api.put(`/user/resetpassword/${token}`, {
        password: data.password
      });

      setMessage(res.data?.message || "Password reset successful.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-[0_30px_90px_rgba(23,23,23,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative overflow-hidden bg-[#171717] p-8 text-white sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(215,162,55,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(154,77,49,0.34),_transparent_34%)]" />
          <div className="relative h-full flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#f0d6aa]">
              E-Garage Security
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              Create a new password
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Choose a new password for your account. This reset link works only for a short time.
            </p>
          </div>
        </div>

        <div className="bg-[#fffaf2] p-8 sm:p-10 lg:p-12 flex items-center">
          <div className="mx-auto max-w-md w-full">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#9a4d31]">
              Reset Password
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#171717]">
              Update credentials
            </h2>

            <form onSubmit={handleSubmit(submitHandler)} className="mt-8 grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-[#4c473f]">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                  className="w-full rounded-[22px] border border-black/8 bg-white px-4 py-3.5 outline-none transition focus:border-[#9a4d31]"
                />
                {errors.password && (
                  <p className="mt-2 text-sm font-semibold text-rose-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#4c473f]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match"
                  })}
                  className="w-full rounded-[22px] border border-black/8 bg-white px-4 py-3.5 outline-none transition focus:border-[#9a4d31]"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm font-semibold text-rose-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {message && (
                <div className="rounded-[22px] bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                  {message}
                </div>
              )}

              {errorMsg && (
                <div className="rounded-[22px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-[#9a4d31] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#7f3c23] disabled:bg-slate-300"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <div className="mt-8 text-sm font-semibold">
              <Link to="/login" className="text-[#9a4d31] transition hover:text-[#7f3c23]">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
