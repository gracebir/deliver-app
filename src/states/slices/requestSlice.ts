/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

type initialStateType = {
    notifications: Array<RequestType> | null;
    notification: RequestType | null;
};

const initialState: initialStateType = {
    notifications: null,
    notification: null,
};

const requestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateStatus: builder.mutation({
            query: ({ id, value }) => {
                return {
                    url: `/request/status/${id}`,
                    method: "PUT",
                    body: value,
                };
            },
        }),
        getRequest: builder.query({
            query: (id) => `/request/all/${id}`,
        }),
        getRequestDetail: builder.query({
            query: (id) => `/request/detail/${id}`,
        }),
    }),
});

const requestSlice = createSlice({
    initialState,
    name: "request",
    reducers: {
        setNotifications: (state, { payload }) => {
            state.notifications = payload;
        },
        setNotification: (state, { payload }) => {
            state.notification = payload;
        },
    },
});

export const { setNotification, setNotifications } = requestSlice.actions;

export const {
    useGetRequestQuery,
    useUpdateStatusMutation,
    useGetRequestDetailQuery,
} = requestApi;

export default requestSlice;
