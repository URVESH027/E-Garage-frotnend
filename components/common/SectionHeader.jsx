import React from "react";

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  actions = null,
  theme = "dark",
}) => {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleTone = theme === "light" ? "text-[#171717]" : "text-white";
  const bodyTone = theme === "light" ? "text-[#5d5a53]" : "text-white/68";
  const eyebrowTone = theme === "light" ? "text-[#b35b14]" : "text-[#ff9d3f]";

  return (
    <div className={`mb-8 flex flex-col gap-3 ${alignment} lg:flex-row lg:justify-between lg:items-end`}>
      <div className={align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"}>
        {eyebrow && (
          <p className={`text-xs font-bold uppercase tracking-[0.32em] ${eyebrowTone}`}>
            {eyebrow}
          </p>
        )}
        <h2 className={`garage-section-title mt-3 text-4xl font-black tracking-tight ${titleTone} sm:text-5xl ${align === "center" ? "mx-auto w-full max-w-2xl" : ""}`}>
          {title}
        </h2>
        {description && (
          <p className={`mt-3 text-sm leading-7 ${bodyTone}`}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
};

export default SectionHeader;
