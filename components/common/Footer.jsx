import React from "react";

const Footer = () => {
  return (
    <section id="contact" className="app-shell mb-12">
      <div className="overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,#15161a,#09090b)] text-white shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
        <div className="border-b border-white/8 px-8 py-10 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#ff9d3f]">Contact</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
                Need expert support for your next service visit?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
                Talk to the workshop team, schedule your appointment, and manage your service
                history through a more premium customer experience.
              </p>
            </div>
            <a
              href="#booking"
              className="garage-button inline-flex rounded-xl px-7 py-3.5 text-sm font-bold"
            >
              Book Appointment
            </a>
          </div>
        </div>

        <div className="grid gap-4 px-8 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">Quick Links</p>
            <p className="mt-4 text-lg font-black text-white">Home, Services, Booking</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">Services</p>
            <p className="mt-4 text-lg font-black text-white">Repair, Maintenance, Wheels</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">Email</p>
            <p className="mt-4 text-lg font-black text-white">info@egarage.com</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">Follow Us</p>
            <p className="mt-4 text-lg font-black text-white">Instagram, Facebook, WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
