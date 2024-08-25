/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";
import {
    getInitialToken,
    removeTokenFromLocalStorage,
    saveTokenToLocalStorage,
} from "../../utils/localstorage";

type initialStateType = {
    token: string | null;
    user: UserType | null;
};

const initialState: initialStateType = {
    user: null,
    token: getInitialToken(),
};

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (value) => {
                return {
                    url: "/auth/signin",
                    method: "POST",
                    body: value,
                };
            },
        }),
        getMe: builder.query({
            query: () => `/users/me`,
        }),
        getUserByid: builder.query({
            query: (id) => `/users/${id}`,
        }),
    }),
});

const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setToken: (state, { payload }) => {
            saveTokenToLocalStorage(payload);
            state.token = payload;
        },
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            removeTokenFromLocalStorage();
        },
    },
});

export const { useSigninMutation, useGetMeQuery, useGetUserByidQuery } =
    authApi;
export const { setToken, setUser, logout } = authSlice.actions;

export default authSlice;
