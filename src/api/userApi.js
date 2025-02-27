import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api'
    }),
    endpoints: (builder) => ({
        saveUserResponse: builder.mutation({
            query: (responseData) => ({
                url: '/user/response/save',
                method: 'POST',
                body: responseData,
            }),
        }),
        getUserResponses: builder.mutation({
            query: (requestData) => ({
                url: '/user/response/get',
                method: 'POST',
                body: requestData,
            }),
        }),
        getUserResults: builder.query({
            query: () => ({
                url: '/user/response/results',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useSaveUserResponseMutation,
    useGetUserResponsesMutation,
    useGetUserResultsQuery,
} = userApi;
