import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCaseStudies as fetchCaseStudiesApi } from "./caseStudiesApi";

export const CATEGORY_FILTERS = ["All", "Web", "Mobile", "AI", "Blockchain"];

const initialState = {
  items: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  filters: {
    category: "All",
    query: "",
  },
};

export const fetchCaseStudies = createAsyncThunk(
  "caseStudies/fetchCaseStudies",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await fetchCaseStudiesApi({ signal });
    } catch (err) {
      // Re-throw aborts so the thunk is flagged as aborted rather than failed.
      if (err?.name === "AbortError") throw err;
      return rejectWithValue(err?.message ?? "Unknown error");
    }
  }
);

const caseStudiesSlice = createSlice({
  name: "caseStudies",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setQuery(state, action) {
      state.filters.query = action.payload;
    },
    clearFilters(state) {
      state.filters = { ...initialState.filters };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStudies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        // Aborted requests (remount / retry) are not real failures.
        if (action.meta.aborted) return;
        state.status = "failed";
        state.error = action.payload ?? action.error?.message ?? "Request failed";
      });
  },
});

export const { setCategory, setQuery, clearFilters } = caseStudiesSlice.actions;

export default caseStudiesSlice.reducer;
