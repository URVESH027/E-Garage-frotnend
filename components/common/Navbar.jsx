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
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#09090b]/90 text-white backdrop-blur-xl">
      <div className="border-b border-white/6 bg-black/40">
        <div className="app-shell flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
          <span>Trusted Auto Care Platform</span>
          <span>Call Us: +91 98765 43210</span>
        </div>
      </div>

      <div className="app-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-[#ff7a00]">
              G
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#ff9d3f]">
                Premium Workshop
              </p>
              <h1 className="mt-1 text-3xl font-black uppercase tracking-wide text-white transition group-hover:text-[#ff9d3f]">
                E-Garage
              </h1>
            </div>
          </Link>

          <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60 md:block">
            Reliable car repair and booking
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/80">
          <a href="#services" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
            Services
          </a>
          <a href="#booking" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
            Booking
          </a>
          {isLoggedIn && (
            <a href="#mybookings" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
              My Bookings
            </a>
          )}
          <a href="#contact" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
            Contact
          </a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-white transition hover:bg-white/10"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="garage-button rounded-xl px-5 py-2.5 font-bold"
            >
              Appointment
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
