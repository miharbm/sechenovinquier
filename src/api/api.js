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
            query: () => ({
                url: '/user/response/get',
                method: 'GET',
                body: {
                    "user_id": "123e4567-e89b-12d3-a456-426614174000",
                    "pass_num": 1
                }
            }),
        }),
    }),
});

export const {
    useGetUsersResultsQuery
} = api;
