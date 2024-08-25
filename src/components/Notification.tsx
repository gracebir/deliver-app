/** @format */

import React, { useEffect } from "react";
import {
    setNotifications,
    useGetRequestQuery,
} from "../states/slices/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states/store";
import Card from "./Card";

const Notification: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { data, isLoading } = useGetRequestQuery(user?._id);
    const dispatch: AppDispatch = useDispatch();
    const notifications = useSelector(
        (state: RootState) => state.request.notifications
    );

    useEffect(() => {
        if (!isLoading && data?.length !== 0) {
            dispatch(setNotifications(data));
        }
    }, [isLoading, data]);

    if (isLoading)
        return (
            <div className='h-[80vh] w-full px-6 py-2 flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );

    return (
        <div className='h-[80vh] w-full px-6 py-2 border-2 border-gray-500 overflow-y-auto'>
            {notifications?.length !== 0 ? (
                notifications?.map((notification) => (
                    <Card
                        key={notification._id}
                        id={notification._id}
                        sendDate={notification.createdAt}
                        note={notification.note}
                    />
                ))
            ) : (
                <div>
                    <p>Pas de Notificaiton </p>
                </div>
            )}
        </div>
    );
};

export default Notification;
