import React from "react";
import { FaUsers, FaRocket, FaShieldAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

const ICONS = {
  users: FaUsers,
  rocket: FaRocket,
  team: HiUserGroup,
  shield: FaShieldAlt,
};

const ACCENTS = {
  purple: {
    border: "border-[#a855f7]/60",
    activeBorder: "border-[#a855f7]",
    glow: "shadow-[#a855f7]/30",
    hoverGlow: "hover:shadow-[#a855f7]/30",
    iconBg: "bg-[#a855f7]/15 text-[#c084fc]",
    bar: "from-[#a855f7] to-[#7c3aed]",
  },
  blue: {
    border: "border-[#3F5EFB]/60",
    activeBorder: "border-[#3F5EFB]",
    glow: "shadow-[#3F5EFB]/30",
    hoverGlow: "hover:shadow-[#3F5EFB]/30",
    iconBg: "bg-[#3F5EFB]/15 text-[#60a5fa]",
    bar: "from-[#3F5EFB] to-[#38bdf8]",
  },
  teal: {
    border: "border-[#59D3AA]/60",
    activeBorder: "border-[#59D3AA]",
    glow: "shadow-[#59D3AA]/30",
    hoverGlow: "hover:shadow-[#59D3AA]/30",
    iconBg: "bg-[#59D3AA]/15 text-[#5eead4]",
    bar: "from-[#59D3AA] to-[#22d3ee]",
  },
  pink: {
    border: "border-[#FC466B]/60",
    activeBorder: "border-[#FC466B]",
    glow: "shadow-[#FC466B]/30",
    hoverGlow: "hover:shadow-[#FC466B]/30",
    iconBg: "bg-[#FC466B]/15 text-[#f472b6]",
    bar: "from-[#FC466B] to-[#ec4899]",
  },
};

const FeatureCard = ({ title, desc, icon, accent = "purple", isActive = false, onClick }) => {
  const Icon = ICONS[icon] ?? FaUsers;
  const style = ACCENTS[accent] ?? ACCENTS.purple;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`group relative flex h-full w-full flex-col items-center overflow-hidden rounded-2xl border bg-gradient-to-b from-[#110D2E] to-[#070420] px-6 py-8 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
        isActive
          ? `${style.activeBorder} -translate-y-2 shadow-2xl ${style.glow}`
          : `${style.border} hover:-translate-y-1 hover:shadow-xl ${style.hoverGlow}`
      }`}
    >
      <span
        className={`flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 ${style.iconBg} transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="h-9 w-9" aria-hidden="true" />
      </span>

      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <span
        className={`mt-3 h-1 rounded-full bg-gradient-to-r ${style.bar} transition-all duration-300 ${
          isActive ? "w-16" : "w-10 group-hover:w-16"
        }`}
      />
      <p className="mt-4 text-sm leading-relaxed text-gray-400">{desc}</p>

      {/* Dotted texture at the bottom, echoing the design reference */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:12px_12px] [mask-image:linear-gradient(to_top,black,transparent)]"
      />
    </button>
  );
};

export default FeatureCard;
