import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authHeader from "./authHeader.js";

const baseUrl = import.meta.env.VITE_API_URL


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: authHeader
    }),
    tagTypes: ['UserResults'],
    endpoints: (builder) => ({
        getUsersResults: builder.query({
            query: () => ({
                url: '/user/response/results',
                method: 'GET',
            }),
        }),
        getInquierItem: builder.query({
            query: ({userId, passNum, quizId }) => ({
                url: '/user/response/get',
                method: 'GET',
                params: {
                    UserId: userId,
                    PassNum: passNum,
                    QuizId: quizId,
                },
            }),
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/auth/register/user',
                method: 'POST',
                body: data,
            }),
        }),
        getUserInfo: builder.query({
            query: ({userId}) => ({
                url: "/user/info/get",
                method: 'GET',
                params: {
                    UserId: userId,
                }
            })
        })
    }),
});

export const {
    useGetUsersResultsQuery,
    useGetInquierItemQuery,
    useRegisterUserMutation,
    useGetUserInfoQuery,
} = api;
