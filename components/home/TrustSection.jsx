import React from "react";
import SectionHeader from "../common/SectionHeader";

const highlights = [
  {
    title: "Experienced Technicians",
    text: "Workshop-first presentation builds confidence before users even reach the booking form.",
  },
  {
    title: "Quality Workmanship",
    text: "Every section now focuses on professional service value instead of looking like a generic app.",
  },
  {
    title: "Affordable Pricing",
    text: "Prices are surfaced clearly and paired with service context so decisions feel easier.",
  },
  {
    title: "Customer Satisfaction",
    text: "The booking and dashboard flow still works, but now sits inside a much stronger brand experience.",
  },
];

const TrustSection = () => {
  return (
    <section className="garage-light-panel mb-16 rounded-[34px] p-7 text-[#171717] sm:p-10">
      <SectionHeader
        eyebrow="Why Choose Us"
        title="Professional vehicle care with a sharper customer journey"
        description="This section is modeled more like a real automotive business homepage: clear trust points, strong contrast, and benefits that support the booking action."
        theme="light"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item, index) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-black/6 bg-white p-6 text-center shadow-[0_18px_44px_rgba(0,0,0,0.08)] transition hover:-translate-y-1"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1b1f] text-lg font-black text-[#ff9d3f]">
              0{index + 1}
            </div>
            <h3 className="mt-5 text-3xl font-black tracking-tight text-[#171717]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#5d5a53]">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
