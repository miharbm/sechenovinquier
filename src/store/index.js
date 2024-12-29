import { configureStore } from '@reduxjs/toolkit';
import {authApi} from "../api/authApi.js";
import authReducer from '../reducers/authSlice';
import {api} from "../api/api.js";
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [api.reducerPath]: api.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, api.middleware),
});