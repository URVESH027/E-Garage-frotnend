import React from "react";

const BookingSection = ({
  name,
  setName,
  vehicle,
  setVehicle,
  selectedService,
  setSelectedService,
  services,
  date,
  setDate,
  message,
  handleBooking,
  selectedServiceData,
  submitting,
  paymentReady,
}) => {
  return (
    <section id="booking" className="mb-16 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="garage-panel rounded-[32px] p-7 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#ff9d3f]">
          Booking Form
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-white">
          Book your workshop appointment
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/68">
          The form keeps your flow simple, while the layout now looks like a real automotive
          service booking page with stronger contrast and clearer next steps.
        </p>

        <form onSubmit={handleBooking} className="mt-8 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-white/75">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-[18px] border border-white/10 bg-white/6 px-4 py-3.5 text-white outline-none transition focus:border-[#ff7a00] focus:bg-white/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-white/75">
                Vehicle Name
              </label>
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Example: Swift, i20"
                className="w-full rounded-[18px] border border-white/10 bg-white/6 px-4 py-3.5 text-white outline-none transition focus:border-[#ff7a00] focus:bg-white/10"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-white/75">
                Service Type
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full rounded-[18px] border border-white/10 bg-white/6 px-4 py-3.5 text-white outline-none transition focus:border-[#ff7a00] focus:bg-white/10"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-white/75">
                Booking Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-[18px] border border-white/10 bg-white/6 px-4 py-3.5 text-white outline-none transition focus:border-[#ff7a00] focus:bg-white/10"
              />
            </div>
          </div>

          {message && (
            <div
              className={`rounded-[20px] px-4 py-3 text-sm font-bold ${
                message === "Service booked successfully"
                  ? "bg-emerald-500/14 text-emerald-300"
                  : "bg-rose-500/14 text-rose-300"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={submitting || !paymentReady}
              className="garage-button rounded-xl px-6 py-3 text-sm font-bold disabled:opacity-60"
            >
              {submitting ? "Opening Payment..." : `Pay Rs. ${selectedServiceData?.price} & Book`}
            </button>
            <p className="text-sm font-medium text-white/58">
              Razorpay test mode is enabled for simple payment testing.
            </p>
          </div>

          {!paymentReady && (
            <p className="text-sm font-medium text-rose-300">
              Razorpay script is not ready yet. Refresh the page and try again.
            </p>
          )}
        </form>
      </div>

      <div className="grid gap-5">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#121317] text-white shadow-[0_20px_55px_rgba(15,23,42,0.12)]">
          <div
            className="h-52 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1000&q=80')",
            }}
          />
          <div className="p-8">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#ffb777]">
              Service Preview
            </p>
            <h3 className="mt-4 text-4xl font-black tracking-tight text-white">
              {selectedService}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {selectedServiceData?.description}
            </p>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Estimated Cost</p>
              <p className="mt-2 text-4xl font-black text-[#ff9d3f]">
                Rs. {selectedServiceData?.price}
              </p>
              <p className="mt-3 text-sm text-white/68">
                You will pay in Razorpay test mode and then your booking will be saved automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="garage-light-panel rounded-[32px] p-8 text-[#171717]">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#b35b14]">
            Booking Benefit
          </p>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-[#171717]">
            Clean flow, stronger trust, better conversion feel
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#5d5a53]">
            The booking form and service summary are now separated the way real garage websites
            present appointments: high-confidence visuals on one side and a direct action form on the other.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
