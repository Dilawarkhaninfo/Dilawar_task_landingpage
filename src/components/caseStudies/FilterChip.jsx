import React from "react";

const FilterChip = ({ label, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`min-h-[40px] rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5EFB] ${
        isActive
          ? "bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-white shadow-lg shadow-[#3F5EFB]/30 scale-105"
          : "border border-white/15 bg-[#110D2E] text-gray-300 hover:border-[#3F5EFB]/60 hover:text-white hover:scale-105"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterChip;
