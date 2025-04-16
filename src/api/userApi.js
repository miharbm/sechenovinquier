import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authHeader from "./authHeader.js";

const baseUrl = import.meta.env.VITE_API_URL


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/user",
        prepareHeaders: authHeader
    }),
    tagTypes: ['UserResults'],
    endpoints: (builder) => ({
        getUsersResults: builder.query({
            query: () => ({
                url: '/response/results',
                method: 'GET',
            }),
        }),
        getInquierItem: builder.query({
            query: ({userId, passNum, quizId }) => ({
                url: '/response/get',
                method: 'GET',
                params: {
                    UserId: userId,
                    PassNum: passNum,
                    QuizId: quizId,
                },
            }),
        }),
        getUserInfo: builder.query({
            query: ({userId}) => ({
                url: "/info/get",
                method: 'GET',
                params: {
                    UserId: userId,
                }
            })
        }),
        uploadAvatar: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('image', file);

                return {
                    url: "/upload-avatar",
                    method: "POST",
                    body: formData
                };
            },
        })
    }),
});

export const {
    useGetUsersResultsQuery,
    useGetInquierItemQuery,
    useGetUserInfoQuery,
    useUploadAvatarMutation,
} = userApi;
