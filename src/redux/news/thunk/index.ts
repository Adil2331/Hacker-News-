import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { NewsState } from "../types";
import { newNewsList } from "./newNewsList";

export const extraReducers = (builder: ActionReducerMapBuilder<NewsState>) => {
  builder.addMatcher(isAnyOf(newNewsList.fulfilled), (state, action) => {
    state.isLoading = false;
    state.newNewsList = action.payload;
  });
  builder.addMatcher(isAnyOf(newNewsList.pending), (state) => {
    state.isLoading = true;
  });
  builder.addMatcher(
    isAnyOf(newNewsList.fulfilled, newNewsList.rejected),
    (state) => {
      state.isLoading = false;
    }
  );
};
