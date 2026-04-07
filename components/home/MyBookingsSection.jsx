import React from "react";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";

const MyBookingsSection = ({ bookings, deleteBooking, loading, error }) => {
  return (
    <section id="mybookings" className="mb-14">
      <SectionHeader
        eyebrow="My Bookings"
        title="Track and manage your scheduled visits"
        description="Your appointment history now looks more like a professional service portal, while still keeping the actions simple for learning."
      />

      {loading ? (
        <div className="garage-panel rounded-[28px] px-7 py-10 text-sm font-semibold text-white/72">
          Loading your bookings...
        </div>
      ) : error ? (
        <div className="rounded-[28px] bg-rose-500/12 px-7 py-10 text-sm font-semibold text-rose-300 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
          {error}
        </div>
      ) : bookings.length === 0 ? (
        <div className="garage-panel rounded-[28px] border border-dashed border-white/12 px-7 py-10 text-sm leading-7 text-white/65">
          No bookings yet. Your confirmed appointments will show up here once you schedule a service.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {bookings.map((booking, index) => (
            <article
              key={booking.id}
              className="garage-panel rounded-[28px] p-6 text-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff7a00] text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/42">Appointment</p>
                    <h3 className="mt-1 text-3xl font-black tracking-tight text-white">
                      {booking.service}
                    </h3>
                  </div>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/8 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/42">Customer</p>
                  <p className="mt-2 text-sm font-bold text-white">{booking.customerName}</p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/42">Vehicle</p>
                  <p className="mt-2 text-sm font-bold text-white">{booking.vehicle}</p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/4 p-4 sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/42">Visit Date</p>
                  <p className="mt-2 text-sm font-bold text-[#ffb777]">{booking.date}</p>
                </div>
              </div>

              <button
                onClick={() => deleteBooking(booking.id)}
                className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-500/20"
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
