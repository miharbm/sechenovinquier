import { configureStore } from '@reduxjs/toolkit';
import {authApi} from "../api/authApi.js";
import authReducer from '../reducers/authSlice';
import {userApi} from "../api/userApi.js";
import {adminApi} from "../api/adminApi.js";
import {quizApi} from "../api/quizApi.js";
import {questionsApi} from "../api/questionsApi.js";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [quizApi.reducerPath]: quizApi.reducer,
        [questionsApi.reducerPath]: questionsApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, adminApi.middleware, quizApi.middleware, questionsApi.middleware,),
});