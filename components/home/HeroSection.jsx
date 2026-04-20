import React from "react";

const HeroSection = ({ servicesCount, bookingsCount, selectedService, selectedServiceData }) => {
  return (
    <section className="app-shell pb-14 pt-8">
      <div className="overflow-hidden rounded-[28px] border border-blue-100 bg-[linear-gradient(135deg,#eff6ff,#ffffff_52%,#f8fafc)] shadow-[0_24px_60px_rgba(37,99,235,0.08)]">
        <div className="grid items-center gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-blue-700">
              Trusted vehicle support
            </div>

            <h2 className="mt-6 text-5xl font-black leading-[0.95] text-slate-900 sm:text-6xl">
              Reliable Car Repair
              <span className="block text-blue-600">& Booking</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Book trusted automotive services through a cleaner, brighter, and more professional
              experience designed to feel like a real startup product.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#booking" className="garage-button rounded-xl px-7 py-3.5 text-sm font-bold">
                Book Appointment
              </a>
              <a
                href="#services"
                className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Services</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{servicesCount}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bookings</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{bookingsCount}</p>
              </div>
              <div className="rounded-2xl bg-green-50 p-4 shadow-[0_16px_40px_rgba(34,197,94,0.08)]">
                <p className="text-xs uppercase tracking-[0.24em] text-green-700">Current</p>
                <p className="mt-2 text-lg font-black text-green-800">{selectedService}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[28px] bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
                alt="Car service"
                className="h-[360px] w-full rounded-[22px] object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-5 rounded-[22px] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Service Preview</p>
              <h3 className="mt-2 text-2xl font-black text-slate-900">{selectedService}</h3>
              <p className="mt-2 text-sm text-slate-600">{selectedServiceData?.description}</p>
              <p className="mt-3 text-2xl font-black text-orange-500">Rs. {selectedServiceData?.price}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
