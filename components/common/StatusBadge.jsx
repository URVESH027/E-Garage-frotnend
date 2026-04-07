import React from "react";

const palette = {
  Approved: "border border-emerald-500/20 bg-emerald-500/12 text-emerald-300",
  Rejected: "border border-rose-500/20 bg-rose-500/12 text-rose-300",
  Pending: "border border-[#ff7a00]/25 bg-[#ff7a00]/15 text-[#ffb777]",
};

const StatusBadge = ({ status }) => {
  const tone = palette[status] || "border border-white/10 bg-white/5 text-white/70";

  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${tone}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
