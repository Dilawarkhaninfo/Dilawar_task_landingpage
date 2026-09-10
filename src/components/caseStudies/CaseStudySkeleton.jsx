import React from "react";

const CaseStudySkeleton = () => {
  return (
    <div
      className="flex h-full animate-pulse flex-col rounded-2xl border border-white/10 bg-[#110D2E] p-6"
      aria-hidden="true"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="h-6 w-20 rounded-full bg-white/10" />
        <div className="h-4 w-10 rounded bg-white/10" />
      </div>
      <div className="h-5 w-3/4 rounded bg-white/10" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-11/12 rounded bg-white/10" />
        <div className="h-3 w-2/3 rounded bg-white/10" />
      </div>
      <div className="mt-6 h-px w-full bg-white/10" />
    </div>
  );
};

export default CaseStudySkeleton;
