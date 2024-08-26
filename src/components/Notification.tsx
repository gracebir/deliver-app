/** @format */

import React, { useEffect } from "react";
import {
    addNotification,
    setNotifications,
    useGetRequestQuery,
} from "../states/slices/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states/store";
import Card from "./Card";
import { useSocketContext } from "../states/socketContext";
import notification from "../assets/notification.mp3";

const Notification: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { data, isLoading } = useGetRequestQuery(user?._id);
    const { socket } = useSocketContext();
    const dispatch: AppDispatch = useDispatch();
    const notifications = useSelector(
        (state: RootState) => state.request.notifications
    );

    useEffect(() => {
        if (!isLoading && data?.length !== 0) {
            dispatch(setNotifications(data));
        }
    }, [isLoading, data]);

    useEffect(() => {
        // Check if the socket is available before setting up the listener
        if (socket) {
            socket.on("newRequest", (newRequest: RequestType) => {
                const sound = new Audio(notification);
                sound.play();
                dispatch(addNotification(newRequest));
            });

            // Cleanup function to remove the listener
            return () => {
                socket.off("newRequest");
            };
        }

        // If there's no socket, return undefined (or just return nothing)
        return undefined;
    }, [socket, dispatch]);

    if (isLoading)
        return (
            <div className='h-[80vh] w-full px-6 py-2 flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );

    return (
        <div className='h-[80vh] w-full flex flex-col gap-2 px-6 py-2 border-2 border-gray-500 overflow-y-auto'>
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
