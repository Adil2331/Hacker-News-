import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";
import { extraReducers } from "./thunk/index";

import * as types from "./types";

const initialState: types.NewsState = {
  isLoading: false,
  newNewsList: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers,
  extraReducers,
});

export const newsActions = newsSlice.actions;
export default newsSlice.reducer;
