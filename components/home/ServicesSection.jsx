import React from "react";

const serviceImages = {
  "Oil Change":
    "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=900&q=80",
  "Car Wash":
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80",
  "Brake Check":
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80",
  "Engine Service":
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80",
};

const ServicesSection = ({ services, setSelectedService }) => {
  return (
    <section
      id="services"
      className="mb-16 rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,#141418,#0b0b0d)] p-7 shadow-[0_28px_70px_rgba(0,0,0,0.28)] sm:p-9"
    >
      <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#ff9d3f]">
            Services
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Workshop services built for performance, safety, and daily reliability
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-white/68">
          Each package is presented like a real service offer, with stronger imagery, pricing,
          and a direct action that pushes users naturally into the booking flow.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.id}
            className="group overflow-hidden rounded-[26px] border border-white/8 bg-[#17181c] shadow-[0_18px_50px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,0,0,0.42)]"
          >
            <div
              className="h-44 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.35)), url('${serviceImages[service.name]}')`,
              }}
            />

            <div className="p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-[#ff7a00]/18 bg-[#ff7a00]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[#ffb777]">
                  Package
                </span>
                <span className="text-sm font-bold text-white/55">0{service.id}</span>
              </div>

              <h3 className="mt-5 text-3xl font-black tracking-tight text-white">
                {service.name}
              </h3>
              <p className="mt-4 min-h-24 text-sm leading-7 text-white/68">
                {service.description}
              </p>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">Price</p>
                <p className="mt-2 text-3xl font-black text-[#ff9d3f]">Rs. {service.price}</p>
              </div>

              <button
                onClick={() => setSelectedService(service.name)}
                className="garage-button mt-6 w-full rounded-xl px-4 py-3 text-sm font-bold"
              >
                Select This Service
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
