import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authHeader from "./authHeader.js";

const baseUrl = import.meta.env.VITE_API_URL


export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/admin",
        prepareHeaders: authHeader
    }),
    tagTypes: ['Admin'],
    endpoints: (builder) => ({
        getUsersResult: builder.query({
            query: () => '/patient/results',
        }),
        getUserResult: builder.query({
            query: () => '/patient/result',
        }),
        getPatientList: builder.query({
            query: () => '/patient/list',
        }),
        getPatientInfo: builder.query({
            query: () => '/patient/info',
        }),
        getQuizInfo: builder.query({
            query: () => '/quiz/info',
        }),
    }),
});

export const {
    useGetUsersResultQuery,
    useGetUserResultQuery,
    useGetPatientListQuery,
    useGetPatientInfoQuery,
    useGetQuizInfoQuery,
} = adminApi;
