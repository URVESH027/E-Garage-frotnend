import React from "react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const paymentId = location.state?.paymentId || "Test payment completed";
  const serviceName = location.state?.serviceName || "Your service";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-[32px] bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-emerald-700">
          Payment Success
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
          Payment completed successfully
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Your payment was verified and your booking was saved. The admin can now see this
          service request from the dashboard.
        </p>

        <div className="mt-8 grid gap-4 rounded-[24px] bg-slate-50 p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Service</p>
            <p className="mt-2 text-base font-bold text-slate-950">{serviceName}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Payment Id</p>
            <p className="mt-2 break-all text-base font-bold text-slate-950">{paymentId}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-teal-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
          >
            Back to Home
          </Link>
          <Link
            to="/admin"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Open Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
