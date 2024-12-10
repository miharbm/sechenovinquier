import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        credentials: {username: null, password: null, userId: null},
    },
    reducers: {
        setCredentials: (state, action) => {
            state.credentials = action.payload;
        },
        clearCredentials: (state) => {
            state.credentials = {username: null, password: null, userId: null};
        },
    },
});

export const {
    setCredentials,
    clearCredentials
} = authSlice.actions;

export const selectCredentials = (state) => state.auth.credentials;

export default authSlice.reducer;
