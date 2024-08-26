/** @format */

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiWarning } from "react-icons/ti";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
    setNotification,
    useGetRequestDetailQuery,
    useUpdateStatusMutation,
} from "../states/slices/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states/store";
import Button from "../components/Button";
import { useGetUserByidQuery } from "../states/slices/authSlice";
import { toast } from "react-toastify";
import { useSocketContext } from "../states/socketContext";

const RequestDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetRequestDetailQuery(id);
    const [updateStatus, { isError, isLoading: isLoadingStatus }] =
        useUpdateStatusMutation();
    const dispatch: AppDispatch = useDispatch();
    const notification = useSelector(
        (state: RootState) => state.request.notification
    );

    const { socket } = useSocketContext();

    const { data: user } = useGetUserByidQuery(notification?.senderId);

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(setNotification(data));
        }
    }, [data, isLoading]);

    const handleUpdate = async () => {
        const value = {
            status: "on_way",
        };
        try {
            const response = await updateStatus({
                id,
                value,
            }).unwrap();
            if (response) {
                if (!isLoadingStatus) {
                    toast.success("Notificaiton envoyer");
                }
            }
        } catch (error) {
            if (isError) {
                toast.error("Erreur");
            }
        }
    };

    useEffect(() => {
        // Check if the socket is available before setting up the listener
        if (socket) {
            socket.on("changeStatus", (changeStatus: RequestType) => {
                dispatch(setNotification(changeStatus));
            });

            // Cleanup function to remove the listener
            return () => {
                socket.off("changeStatus");
            };
        }

        // If there's no socket, return undefined (or just return nothing)
        return undefined;
    }, [socket, dispatch]);

    console.log(data);
    if (isLoading)
        return (
            <div className='flex justify-center items-center h-screen'>
                <span className='loading loading-spinner loading-md'></span>
            </div>
        );
    return (
        <div className='h-full relative'>
            <div className='h-[70vh] w-full'>
                <MapContainer
                    center={[
                        notification?.coordinates.latitude! || -1.94995,
                        notification?.coordinates.longitude! || 30.05885,
                    ]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "70vh", width: "100vw" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker
                        position={[
                            notification?.coordinates.latitude! || -1.94995,
                            notification?.coordinates.longitude! || 30.05885,
                        ]}
                    ></Marker>
                </MapContainer>
            </div>
            <div className='fixed bottom-0 py-8 flex flex-col justify-between w-full h-[30vh] overflow-y-auto left-0 right-0 px-6 z-50 bg-white'>
                <div className='flex flex-col gap-2'>
                    <div className='text-sm flex text-red-300 flex-row gap-1 border py-1 px-2 rounded border-red-300'>
                        <TiWarning size={30} />
                        <h1 className='text-gray-600'>
                            <span className='font-semibold '>Note</span>{" "}
                            {notification?.note}
                        </h1>
                    </div>
                    <h1 className='text-sm '>
                        <span className='font-semibold'>Nom du client:</span>{" "}
                        {user?.fullname}
                    </h1>
                    <h1 className='text-sm '>
                        <span className='font-semibold'>Numero Telephone:</span>{" "}
                        {user?.phone_number}
                    </h1>
                </div>
                <div>
                    {notification?.status === "completed" ? (
                        <Button
                            handleClick={() => navigate("/")}
                            isLoading={isLoadingStatus}
                            text='Quitter'
                            type='button'
                        />
                    ) : (
                        <Button
                            handleClick={() => handleUpdate()}
                            isLoading={isLoadingStatus}
                            text='En route'
                            type='button'
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestDetail;
