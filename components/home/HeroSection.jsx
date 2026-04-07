import React from "react";

const HeroSection = ({ servicesCount, bookingsCount, selectedService, selectedServiceData }) => {
  const serviceHighlights = [
    "Diagnostics & Repair",
    "Oil Change & Maintenance",
    "Tire & Wheel Services",
  ];

  return (
    <section className="app-shell pb-14 pt-8">
      <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[#0d0d10] shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
        <div
          className="relative min-h-[520px] overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.74) 42%, rgba(7,7,9,0.28) 100%), url('https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1400&q=80')",
          }}
        >
          <div className="app-shell relative grid min-h-[520px] items-center gap-8 py-12 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full border border-[#ff7a00]/25 bg-[#ff7a00]/12 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffb777]">
                Reliable workshop support
              </div>

              <h2 className="mt-6 text-5xl font-black leading-[0.92] text-white sm:text-6xl">
                Reliable Car Repair
                <span className="block text-[#ff7a00]">& Auto Services</span>
              </h2>

              <p className="mt-4 max-w-xl text-lg font-semibold text-white/85">
                Quality vehicle care, clearer booking, and a professional service experience
                built for real customers.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#booking"
                  className="garage-button rounded-xl px-7 py-3.5 text-sm font-bold"
                >
                  Get a Free Quote
                </a>
                <a
                  href="#services"
                  className="rounded-xl border border-white/14 bg-white/6 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/12"
                >
                  Our Services
                </a>
              </div>
            </div>

            <div className="ml-auto w-full max-w-md rounded-[30px] border border-white/10 bg-black/42 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#ffb777]">
                Current service
              </p>
              <h3 className="mt-4 text-4xl font-black text-white">{selectedService}</h3>
              <p className="mt-4 text-sm leading-7 text-white/72">{selectedServiceData?.description}</p>

              <div className="mt-6 grid gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">Packages</p>
                  <p className="mt-2 text-3xl font-black text-white">{servicesCount}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">Active Visits</p>
                  <p className="mt-2 text-3xl font-black text-white">{bookingsCount}</p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">Starting at</p>
                  <p className="mt-2 text-4xl font-black text-[#ff9d3f]">Rs. {selectedServiceData?.price}</p>
                </div>
                <div className="rounded-2xl border border-[#ff7a00]/20 bg-[#ff7a00]/10 px-4 py-3 text-right text-sm font-bold text-[#ffb777]">
                  Same-day workshop assistance
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="app-shell -mt-8 grid gap-4 pb-8 md:grid-cols-3">
          {serviceHighlights.map((item) => (
            <div
              key={item}
              className="rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,#1a1b20,#111215)] px-6 py-5 text-center text-white shadow-[0_18px_44px_rgba(0,0,0,0.3)]"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#ff7a00]/20 bg-[#ff7a00]/12 text-xl font-black text-[#ff9d3f]">
                +
              </div>
              <h3 className="mt-4 text-2xl font-black">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
