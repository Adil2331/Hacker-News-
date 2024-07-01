import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import baseService from "../../../axios/baseService";

const newNewsListAction = createAction("news/newNewsList");

export const newNewsList = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>(newNewsListAction.type, async (_, { rejectWithValue }) => {
  try {
    const { data } = await baseService.get<string[]>(
      "newstories.json?print=pretty"
    );
    return data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.error || "Something is wrong");
  }
});
