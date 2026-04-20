import React from "react";
import SectionHeader from "../common/SectionHeader";

const serviceImages = {
  "Oil Change":
    "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=900&q=80",
  "Car Wash":
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80",
  "Brake Check":
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80",
  "Engine Service":
    "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=900&q=80",
};

const ServicesSection = ({ services, setSelectedService }) => {
  return (
    <section id="services" className="mb-16">
      <SectionHeader
        eyebrow="Services"
        title="Choose the right service package for your vehicle"
        description="Service cards are cleaner and easier to compare now, with stronger imagery, readable pricing, and more inviting actions."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.id}
            className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_26px_70px_rgba(15,23,42,0.1)]"
          >
            <div
              className="h-44 bg-cover bg-center"
              style={{ backgroundImage: `url('${serviceImages[service.name]}')` }}
            />

            <div className="p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">
                  Service
                </span>
                <span className="text-sm font-bold text-slate-400">0{service.id}</span>
              </div>

              <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
                {service.name}
              </h3>
              <p className="mt-4 min-h-24 text-sm leading-7 text-slate-600">
                {service.description}
              </p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Price</p>
                  <p className="mt-2 text-2xl font-black text-orange-500">Rs. {service.price}</p>
                </div>

                <button
                  onClick={() => setSelectedService(service.name)}
                  className="garage-button rounded-xl px-4 py-2.5 text-sm font-bold"
                >
                  Select
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
