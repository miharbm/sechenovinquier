import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = `http://${import.meta.env.VITE_API_BASE}:${import.meta.env.VITE_API_PORT}`
// const baseUrl = `http://localhost:3010/api`
const baseUrl = import.meta.env.VITE_API_URL


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/auth"
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
    useLogoutMutation,
} = authApi;
