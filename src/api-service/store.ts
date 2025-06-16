import { configureStore } from "@reduxjs/toolkit";
import BaseApi from "./base/api";

export const store = configureStore({
  reducer: {
    [BaseApi.reducerPath]: BaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
