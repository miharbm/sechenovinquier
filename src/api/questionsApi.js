import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authHeader from "./authHeader.js";

const baseUrl = import.meta.env.VITE_API_URL


export const questionsApi = createApi({
    reducerPath: "questionsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/questions",
        prepareHeaders: authHeader
    }),
    endpoints: (builder) => ({
        startQuestion: builder.mutation({
            query: ({quizId}) => ({
                url: "/start",
                method: "POST",
                params: {
                    QuizId: quizId
                }
            }),
        }),
        getQuestion: builder.query({
            query: ({quizId, questionId}) => ({
                url: "/get",
                method: "GET",
                params: {
                    QuizId: quizId,
                    QuestionId: questionId,
                }
            }),
        }),
    }),
});

export const {
    useStartQuestionMutation,
    useGetQuestionQuery,
} = questionsApi;
