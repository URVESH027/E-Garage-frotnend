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
    <section id="booking" className="mb-16 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <div className="garage-panel rounded-[24px] p-7 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-blue-700">
          Booking Form
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
          Book your workshop appointment
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          The booking flow is now easier to scan and use, with better spacing, clear labels,
          and a cleaner two-column layout.
        </p>

        <form onSubmit={handleBooking} className="mt-8 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Vehicle Name
              </label>
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Example: Swift, i20"
                className="w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Service Type
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Booking Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {message && (
            <div
              className={`rounded-[16px] px-4 py-3 text-sm font-bold ${
                message === "Service booked successfully"
                  ? "bg-green-50 text-green-700"
                  : "bg-rose-50 text-rose-700"
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
            <p className="text-sm font-medium text-slate-500">
              Razorpay test mode is enabled for simple payment testing.
            </p>
          </div>

          {!paymentReady && (
            <p className="text-sm font-medium text-rose-600">
              Razorpay script is not ready yet. Refresh the page and try again.
            </p>
          )}
        </form>
      </div>

      <div className="grid gap-5">
        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div
            className="h-52 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(37,99,235,0.08)), url('https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1000&q=80')",
            }}
          />
          <div className="p-8">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-orange-500">
              Service Preview
            </p>
            <h3 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
              {selectedService}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {selectedServiceData?.description}
            </p>
            <div className="mt-6 rounded-[20px] bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Estimated Cost</p>
              <p className="mt-2 text-4xl font-black text-orange-500">
                Rs. {selectedServiceData?.price}
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Review the selected service before confirming your payment and booking.
              </p>
            </div>
          </div>
        </div>

        <div className="garage-light-panel rounded-[24px] p-8">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-blue-700">
            Booking Benefit
          </p>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Simple form, clear preview, better confidence
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            The form and service preview are separated into clean cards so users can scan details quickly,
            understand the price, and complete the action with less friction.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
