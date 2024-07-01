import { configureStore } from "@reduxjs/toolkit";
import news from "../../redux/news/slice";

export const store = configureStore({
  reducer: {
    news,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
