import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authHeader from "./authHeader.js";

// const baseUrl = import.meta.env.VITE_API_URL


export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: baseUrl + "/notification",
        baseUrl: "http://185.72.145.208:3011/api",
        prepareHeaders: authHeader
    }),
    endpoints: (builder) => ({
        subscribe: builder.mutation({
            query: (subscription) => ({
                url: '/subscribe',
                method: 'POST',
                body: subscription,
            }),
        }),
        notify: builder.mutation({
            query: () => ({
                url: '/notify',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useSubscribeMutation,
    useNotifyMutation
} = notificationsApi;