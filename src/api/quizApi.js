import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authHeader from "./authHeader.js";

const baseUrl = import.meta.env.VITE_API_URL


export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/quiz",
        prepareHeaders: authHeader
    }),
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () => "/list",
        }),
    }),
});

export const {
    useGetQuizzesQuery,
} = quizApi;
