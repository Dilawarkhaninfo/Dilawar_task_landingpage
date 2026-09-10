import React from "react";

const CATEGORY_STYLES = {
  Web: "bg-[#3F5EFB]/20 text-[#8fa2ff] border-[#3F5EFB]/40",
  Mobile: "bg-[#59D3AA]/15 text-[#59D3AA] border-[#59D3AA]/40",
  AI: "bg-[#6318F1]/25 text-[#c4a6ff] border-[#6318F1]/50",
  Blockchain: "bg-[#FC466B]/15 text-[#ff8aa1] border-[#FC466B]/40",
};

const CaseStudyCard = ({ title, category, summary, year }) => {
  const badge = CATEGORY_STYLES[category] ?? "bg-white/10 text-gray-200 border-white/20";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#110D2E] to-[#0a0630] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#3F5EFB]/50 hover:shadow-[#3F5EFB]/20">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${badge}`}>
          {category}
        </span>
        <span className="text-sm text-gray-400">{year}</span>
      </div>

      <h3 className="text-lg font-semibold text-white group-hover:text-[#c4a6ff] transition-colors duration-200">
        {title}
      </h3>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-gray-400">{summary}</p>

      <div className="mt-6 h-px w-full bg-gradient-to-r from-[#FC466B]/60 via-[#3F5EFB]/60 to-transparent" />
    </article>
  );
};

export default CaseStudyCard;
