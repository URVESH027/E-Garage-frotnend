import React from "react";
import SectionHeader from "../common/SectionHeader";

const highlights = [
  {
    icon: "🛠",
    title: "Experienced Technicians",
    text: "Certified support and workshop-ready service for daily maintenance and urgent repair needs.",
  },
  {
    icon: "✅",
    title: "Quality Workmanship",
    text: "Every section now reflects trust and clarity, just like a polished service startup product.",
  },
  {
    icon: "💰",
    title: "Affordable Pricing",
    text: "Pricing is easy to understand and clearly connected to each service offer.",
  },
  {
    icon: "💬",
    title: "Customer Satisfaction",
    text: "A clearer interface means fewer confusing steps and a smoother booking experience.",
  },
];

const TrustSection = () => {
  return (
    <section className="garage-light-panel mb-16 rounded-[24px] p-7 sm:p-10">
      <SectionHeader
        eyebrow="Why Choose Us"
        title="Professional automotive support with a cleaner customer journey"
        description="This section is designed to feel lighter, more premium, and more trustworthy, using simple visual hierarchy and readable content."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-[18px] bg-white p-6 text-center shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              {item.icon}
            </div>
            <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
