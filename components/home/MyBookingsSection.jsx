import React from "react";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";

const MyBookingsSection = ({ bookings, deleteBooking, loading, error }) => {
  return (
    <section id="mybookings" className="mb-14">
      <SectionHeader
        eyebrow="My Bookings"
        title="Track and manage your scheduled visits"
        description="Your booking history now uses the same clean card system as the rest of the website for better readability and consistency."
      />

      {loading ? (
        <div className="garage-panel rounded-[24px] px-7 py-10 text-sm font-semibold text-slate-600">
          Loading your bookings...
        </div>
      ) : error ? (
        <div className="rounded-[24px] bg-rose-50 px-7 py-10 text-sm font-semibold text-rose-700 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
          {error}
        </div>
      ) : bookings.length === 0 ? (
        <div className="garage-panel rounded-[24px] border border-dashed border-slate-200 px-7 py-10 text-sm leading-7 text-slate-600">
          No bookings yet. Your confirmed appointments will show up here once you schedule a service.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {bookings.map((booking, index) => (
            <article
              key={booking.id}
              className="garage-panel rounded-[24px] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Appointment</p>
                    <h3 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                      {booking.service}
                    </h3>
                  </div>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[18px] bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Customer</p>
                  <p className="mt-2 text-sm font-bold text-slate-900">{booking.customerName}</p>
                </div>
                <div className="rounded-[18px] bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Vehicle</p>
                  <p className="mt-2 text-sm font-bold text-slate-900">{booking.vehicle}</p>
                </div>
                <div className="rounded-[18px] bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Visit Date</p>
                  <p className="mt-2 text-sm font-bold text-green-600">{booking.date}</p>
                </div>
              </div>

              <button
                onClick={() => deleteBooking(booking.id)}
                className="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Delete Booking
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBookingsSection;
