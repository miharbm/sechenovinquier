import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `http://${import.meta.env.VITE_API_BASE}:${import.meta.env.VITE_API_PORT}`


export const questionsApi = createApi({
    reducerPath: 'questionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/questions"
    }),
    endpoints: (builder) => ({
        startQuestion: builder.mutation({
            query: (data) => ({
                url: '/start',
                method: 'POST',
                body: data,
            }),
        }),
        getQuestion: builder.query({
            query: () => ({
                url: '/question',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useStartQuestionMutation,
    useGetQuestionQuery,
} = questionsApi;
