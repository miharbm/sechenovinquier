import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {TAG_PATIENTS} from "./tags.js";
import authHeader from "./authHeader.js";

const baseUrl = import.meta.env.VITE_API_URL


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/auth",
        prepareHeaders: authHeader //Если есть данные аутентификации, то вставляет хедер аутентификации
    }),
    endpoints: (builder) => ({
        registerAdmin: builder.mutation({
            query: (data) => ({
                url: '/register/admin',
                method: 'POST',
                body: {
                    ...data,
                    'admin_token': 'sechenovka'
                },
            }),
        }),
        registerPatient: builder.mutation({
            query: (data) => ({
                    url: '/register/user',
                    method: 'POST',
                    body: data,
            }),
            invalidatesTags: [TAG_PATIENTS]
        }),
        login: builder.mutation({
            query: ({username, password}) => ({
                url: '/login',
                method: 'POST',
                body: {
                    username,
                    password,
                },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useRegisterAdminMutation,
    useLoginMutation,
    useRegisterPatientMutation,
    useLogoutMutation,
} = authApi;
