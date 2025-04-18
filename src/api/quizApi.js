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
            transformResponse: (response) => (
                response.list.map((item) => ({
                    quizId: item.quiz_id,
                    name: item.name,
                    description: item.description,
                    isAvailable: item.is_available,
                    timeToPassAgain: item.time_to_pass_again,
                    nextTimeCan: item.next_time_can,
                }))
            )
        }),
    }),
});

export const {
    useGetQuizzesQuery,
} = quizApi;
