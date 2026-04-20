import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
      <div className="app-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-sm">
              G
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-500">
                Automotive Care
              </p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 transition group-hover:text-blue-600">
                E-Garage
              </h1>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
          <a href="#services" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Services
          </a>
          <a href="#booking" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Booking
          </a>
          {isLoggedIn && (
            <a href="#mybookings" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900">
              My Bookings
            </a>
          )}
          <a href="#contact" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Contact
          </a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="garage-button rounded-xl px-5 py-2.5 font-bold">
              Appointment
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
