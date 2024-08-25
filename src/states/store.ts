/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice } from "./apiSlice";
import logger from "redux-logger";
import requestSlice from "./slices/requestSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        request: requestSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(logger),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
