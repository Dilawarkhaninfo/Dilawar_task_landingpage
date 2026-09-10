import {
  selectFilteredCaseStudies,
  selectVisibleCount,
} from "./caseStudiesSelectors";

const items = [
  { id: "1", title: "Telehealth Portal", category: "Web", summary: "Clinic bookings", year: 2024 },
  { id: "2", title: "Fitness App", category: "Mobile", summary: "Workout plans", year: 2023 },
  { id: "3", title: "Ticket Triage", category: "AI", summary: "LLM-powered replies", year: 2024 },
  { id: "4", title: "NFT Market", category: "Blockchain", summary: "Minting and auctions", year: 2022 },
];

const makeState = (filters) => ({
  caseStudies: { items, status: "succeeded", error: null, filters },
});

describe("selectFilteredCaseStudies", () => {
  it("returns every item when category is All and query is empty", () => {
    const state = makeState({ category: "All", query: "" });
    expect(selectFilteredCaseStudies(state)).toHaveLength(4);
    expect(selectVisibleCount(state)).toBe(4);
  });

  it("filters by category", () => {
    const state = makeState({ category: "AI", query: "" });
    expect(selectFilteredCaseStudies(state).map((i) => i.id)).toEqual(["3"]);
  });

  it("searches title and summary case-insensitively", () => {
    expect(
      selectFilteredCaseStudies(makeState({ category: "All", query: "  FITNESS " })).map((i) => i.id)
    ).toEqual(["2"]);
    expect(
      selectFilteredCaseStudies(makeState({ category: "All", query: "auctions" })).map((i) => i.id)
    ).toEqual(["4"]);
  });

  it("combines category and query", () => {
    const state = makeState({ category: "Web", query: "workout" });
    expect(selectFilteredCaseStudies(state)).toEqual([]);
    expect(selectVisibleCount(state)).toBe(0);
  });

  it("is memoized for identical inputs", () => {
    const state = makeState({ category: "All", query: "" });
    expect(selectFilteredCaseStudies(state)).toBe(selectFilteredCaseStudies(state));
  });
});
