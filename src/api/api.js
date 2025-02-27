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
            query: ({userId, passNum }) => ({
                url: '/user/response/get',
                method: 'GET',
                params: {
                    UserId: userId,
                    PassNum: passNum,
                },
            }),
        }),
    }),
});

export const {
    useGetUsersResultsQuery,
    useGetInquierItemQuery,
} = api;
