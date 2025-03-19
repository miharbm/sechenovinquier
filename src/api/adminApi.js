import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authHeader from "./authHeader.js";
import {TAG_PATIENTS} from "./tags.js";

const baseUrl = import.meta.env.VITE_API_URL


export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/admin",
        prepareHeaders: authHeader
    }),
    tagTypes: ["Patients"],
    endpoints: (builder) => ({
        getPatientResults: builder.query({
            query: () => '/patient/results',
        }),
        getPatientResult: builder.query({
            query: ({patientId}) => ({
                url: '/patient/result',
                method: 'GET',
                params: {
                    UserId: patientId,
                }
            }),
        }),
        getPatientList: builder.query({
            query: () => '/patient/list',
            providesTags: [TAG_PATIENTS]
        }),
        getPatientInfo: builder.query({
            query: ({userId}) => ({
                url:  '/patient/info',
                method: 'GET',
                params: {
                    UserId: userId,
                }
            }),
        }),
        getQuizInfo: builder.query({
            query: () => '/quiz/info',
        }),
    }),
});

export const {
    useGetPatientResultsQuery,
    useGetPatientResultQuery,
    useGetPatientListQuery,
    useGetPatientInfoQuery,
    useGetQuizInfoQuery,
} = adminApi;
