import { configureStore } from '@reduxjs/toolkit';
import {authApi} from "../api/authApi.js";
import authReducer from '../reducers/authSlice';
import {userApi} from "../api/userApi.js";
import {adminApi} from "../api/adminApi.js";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, adminApi.middleware),
});