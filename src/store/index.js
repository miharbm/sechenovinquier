import { configureStore } from '@reduxjs/toolkit';
import {authApi} from "../api/authApi.js";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        // files: fileSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});