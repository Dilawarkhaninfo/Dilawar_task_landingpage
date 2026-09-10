import { createSelector } from "@reduxjs/toolkit";

export const selectCaseStudyItems = (state) => state.caseStudies.items;
export const selectCaseStudiesStatus = (state) => state.caseStudies.status;
export const selectCaseStudiesError = (state) => state.caseStudies.error;
export const selectCategoryFilter = (state) => state.caseStudies.filters.category;
export const selectQueryFilter = (state) => state.caseStudies.filters.query;

/**
 * Derived list: category match + case-insensitive search on title/summary.
 * Memoized so identical inputs return the same array reference.
 */
export const selectFilteredCaseStudies = createSelector(
  [selectCaseStudyItems, selectCategoryFilter, selectQueryFilter],
  (items, category, query) => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      if (!matchesCategory) return false;
      if (!needle) return true;
      return (
        item.title.toLowerCase().includes(needle) ||
        item.summary.toLowerCase().includes(needle)
      );
    });
  }
);

export const selectVisibleCount = createSelector(
  [selectFilteredCaseStudies],
  (filtered) => filtered.length
);

export const selectHasActiveFilters = createSelector(
  [selectCategoryFilter, selectQueryFilter],
  (category, query) => category !== "All" || query.trim() !== ""
);
