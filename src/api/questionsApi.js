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
            transformResponse: (data) => ({
                questionText: data.question_text,
                imgName: data.img_name,
                options: data.options.map(option => ({
                    responseText: option.response_text,
                    responseId: option.response_id,
                    points: option.points,
                    nextQuestionId: option.next_question_id,
                })),
                passNum: data.pass_num,
                isMultipleChoice: data.is_multiple_choice,
            })
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
            transformResponse: (data) => ({
                questionText: data.question_text,
                imgName: data.img_name,
                options: data.options.map(option => ({
                    responseText: option.response_text,
                    responseId: option.response_id,
                    points: option.points,
                    nextQuestionId: option.next_question_id,
                })),
                isMultipleChoice: data.is_multiple_choice,
            })
        }),
    }),
});

export const {
    useStartQuestionMutation,
    useLazyGetQuestionQuery,
} = questionsApi;
