import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = "authCredentials";

const nullCredentials = {
    username: null,
    password: null,
    userId: null,
    role: null,
}

const initialState = {
    credentials: JSON.parse(localStorage.getItem(STORAGE_KEY)) || nullCredentials,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.credentials = action.payload;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.credentials));
        },
        clearCredentials: (state) => {
            state.credentials = nullCredentials;
            localStorage.removeItem(STORAGE_KEY);
        },
    },
});

export const {
    setCredentials,
    clearCredentials
} = authSlice.actions;

export const selectCredentials = (state) => state.auth.credentials;

export default authSlice.reducer;
