import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  CATEGORY_FILTERS,
  clearFilters,
  fetchCaseStudies,
  setCategory,
  setQuery,
} from "../../features/caseStudies/caseStudiesSlice";
import {
  selectCaseStudiesError,
  selectCaseStudiesStatus,
  selectCategoryFilter,
  selectFilteredCaseStudies,
  selectHasActiveFilters,
  selectQueryFilter,
  selectVisibleCount,
} from "../../features/caseStudies/caseStudiesSelectors";
import FilterChip from "./FilterChip";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudySkeleton from "./CaseStudySkeleton";

const SKELETON_COUNT = 6;

const CaseStudies = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectCaseStudiesStatus);
  const error = useSelector(selectCaseStudiesError);
  const category = useSelector(selectCategoryFilter);
  const query = useSelector(selectQueryFilter);
  const visible = useSelector(selectFilteredCaseStudies);
  const visibleCount = useSelector(selectVisibleCount);
  const hasActiveFilters = useSelector(selectHasActiveFilters);

  // Fetch on mount; abort the in-flight request if the section unmounts.
  useEffect(() => {
    const request = dispatch(fetchCaseStudies());
    return () => request.abort();
  }, [dispatch]);

  const handleRetry = () => dispatch(fetchCaseStudies());

  const isLoading = status === "loading" || status === "idle";
  const isFailed = status === "failed";
  const isEmpty = status === "succeeded" && visibleCount === 0;

  return (
    <section id="case-studies" className="container mx-auto px-4 sm:px-8 lg:px-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col items-center gap-y-3 text-center">
          <span className="rounded-full border border-[#3F5EFB]/40 bg-[#110D2E] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8fa2ff]">
            Our Work
          </span>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Case{" "}
            <span className="bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
              Studies
            </span>
          </h2>
          <p className="max-w-xl text-gray-400">
            Real products we have shipped across web, mobile, AI and blockchain.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {CATEGORY_FILTERS.map((option) => (
              <FilterChip
                key={option}
                label={option}
                isActive={option === category}
                onClick={() => dispatch(setCategory(option))}
              />
            ))}
          </div>

          <label className="relative block w-full lg:w-80">
            <span className="sr-only">Search case studies</span>
            <CiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              placeholder="Search by title or summary"
              className="min-h-[44px] w-full rounded-full border border-white/15 bg-[#110D2E] py-2 pl-11 pr-10 text-sm text-white placeholder-gray-500 transition-colors duration-200 focus:border-[#3F5EFB] focus:outline-none focus:ring-2 focus:ring-[#3F5EFB]/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => dispatch(setQuery(""))}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <IoCloseCircleOutline className="h-5 w-5" />
              </button>
            )}
          </label>
        </div>

        {/* Result count */}
        {status === "succeeded" && (
          <p className="mt-4 text-sm text-gray-400" aria-live="polite">
            Showing <span className="font-semibold text-white">{visibleCount}</span>{" "}
            {visibleCount === 1 ? "case study" : "case studies"}
            {category !== "All" && (
              <>
                {" "}in <span className="text-white">{category}</span>
              </>
            )}
          </p>
        )}

        {/* Content */}
        <div className="mt-6">
          {isLoading && (
            <div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              role="status"
              aria-label="Loading case studies"
            >
              {Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <CaseStudySkeleton key={i} />
              ))}
            </div>
          )}

          {isFailed && (
            <div
              role="alert"
              className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-[#FC466B]/40 bg-[#FC466B]/10 p-8 text-center"
            >
              <p className="text-lg font-semibold text-white">Could not load case studies</p>
              <p className="text-sm text-gray-300">{error}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="min-h-[44px] rounded-full bg-[#6318F1] px-6 py-2 font-semibold text-white transition duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-[#FC466B] hover:to-[#3F5EFB] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Retry
              </button>
            </div>
          )}

          {isEmpty && (
            <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#110D2E] p-10 text-center">
              <p className="text-lg font-semibold text-white">No case studies match</p>
              <p className="text-sm text-gray-400">
                Try a different category or a broader search term.
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => dispatch(clearFilters())}
                  className="mt-2 min-h-[44px] rounded-full border border-white/20 px-5 py-2 text-sm text-white transition duration-200 hover:border-[#3F5EFB] hover:bg-[#3F5EFB]/20"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {status === "succeeded" && visibleCount > 0 && (
            <div
              // Re-keying on the filter combo re-runs the fade whenever filters change.
              key={`${category}::${query}`}
              className="grid grid-cols-1 gap-6 animate-in fade-in duration-300 md:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((item) => (
                <CaseStudyCard key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
