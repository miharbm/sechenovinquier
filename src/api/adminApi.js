import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authHeader from "./authHeader.js";
import {RESULTS_TAG, TAG_PATIENTS} from "./tags.js";

const baseUrl = import.meta.env.VITE_API_URL


export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/admin",
        prepareHeaders: authHeader
    }),
    tagTypes: [RESULTS_TAG],
    endpoints: (builder) => ({
        getPatientResults: builder.query({
            query: () => '/patient/results',
            transformResponse: (response) => {
                return response.user_results.map((result) => ({
                    quizId: result.quiz_id,
                    quizName: result.quiz_name,
                    userScore: result.user_score,
                    isFailed: Boolean(result.is_failed),
                    passNum: result.pass_num,
                    passTime: result.pass_time,
                    isViewed: Boolean(result.is_viewed),
                    patientFirstName: result.patient_info.first_name,
                    patientLastName: result.patient_info.last_name,
                    userId: result.patient_info.user_id,
                    userAvatarUrl: result.patient_info.avatar_url,
                }))
            },
            providesTags: [RESULTS_TAG]
        }),
        markResultAsViewed:builder.mutation({
            query: ({patientId, quizId, passNum, isViewed}) => ({
                url: '/patient/results/mark_as_viewed',
                method: "PATCH",
                body: {
                    "patient_id": patientId,
                    "quiz_id": quizId,
                    "pass_num": passNum,
                    "is_viewed": isViewed
                }
            }),
            invalidatesTags: [RESULTS_TAG]
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
            transformResponse: (data) => (
                data.patients.map((patient) => ({
                    firstName: patient.first_name,
                    lastName: patient.last_name,
                    userId: patient.user_id,
                    avatarUrl: patient.avatar_url ? `${baseUrl}/static/public/avatars/${patient.avatar_url}` : null
                }))
            ),
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
            transformResponse: (patient) => ({
                firstName: patient.first_name,
                lastName: patient.last_name,
                middleName: patient.middle_name,
                avatarUrl: patient.avatar ? `${baseUrl}/static/public/avatars/${patient.avatar}` : null,
                email: patient.email,
                phone: patient.phone
            })
        }),
    }),
});

export const {
    useGetPatientResultsQuery,
    useGetPatientResultQuery,
    useGetPatientListQuery,
    useGetPatientInfoQuery,
    useMarkResultAsViewedMutation,
} = adminApi;
