import React from "react";

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  actions = null,
}) => {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`mb-8 flex flex-col gap-3 ${alignment} lg:flex-row lg:items-end lg:justify-between`}>
      <div className={align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"}>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-orange-500">
            {eyebrow}
          </p>
        )}
        <h2 className={`mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl ${align === "center" ? "mx-auto w-full max-w-2xl" : ""}`}>
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
};

export default SectionHeader;
