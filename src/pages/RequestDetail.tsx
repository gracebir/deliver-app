/** @format */

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TiWarning } from "react-icons/ti";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
    setNotification,
    useGetRequestDetailQuery,
} from "../states/slices/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states/store";
import Button from "../components/Button";
import { useGetUserByidQuery } from "../states/slices/authSlice";

const RequestDetail: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetRequestDetailQuery(id);
    const dispatch: AppDispatch = useDispatch();
    const notification = useSelector(
        (state: RootState) => state.request.notification
    );

    const { data: user } = useGetUserByidQuery(notification?.senderId);

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(setNotification(data));
        }
    }, [data, isLoading]);

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
                    <Button text='En route' type='button' />
                </div>
            </div>
        </div>
    );
};

export default RequestDetail;
