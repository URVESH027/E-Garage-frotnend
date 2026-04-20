import React from "react";

const Footer = () => {
  return (
    <section id="contact" className="app-shell mb-12">
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div className="border-b border-slate-200 px-8 py-10 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-orange-500">Contact</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                Need help with your next service visit?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Reach the E-Garage team for appointments, service questions, and workshop support.
              </p>
            </div>
            <a
              href="#booking"
              className="garage-button rounded-xl px-7 py-3.5 text-sm font-bold"
            >
              Book Appointment
            </a>
          </div>
        </div>

        <div className="grid gap-4 bg-slate-50 px-8 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
          <div className="rounded-[18px] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Quick Links</p>
            <p className="mt-4 text-lg font-black text-slate-900">Home, Services, Booking</p>
          </div>
          <div className="rounded-[18px] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Phone</p>
            <p className="mt-4 text-lg font-black text-slate-900">+91 98765 43210</p>
          </div>
          <div className="rounded-[18px] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Email</p>
            <p className="mt-4 text-lg font-black text-slate-900">info@egarage.com</p>
          </div>
          <div className="rounded-[18px] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Social</p>
            <p className="mt-4 text-lg font-black text-slate-900">Instagram, Facebook, WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
