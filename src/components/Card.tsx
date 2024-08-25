/** @format */

import React from "react";
import { useUpdateStatusMutation } from "../states/slices/requestSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type cardProps = {
    id: string;
    note: string;
    sendDate: string;
};

const Card: React.FC<cardProps> = ({ id, note, sendDate }) => {
    const [updateStatus, { isError, isLoading }] = useUpdateStatusMutation();
    const date = sendDate ? new Date(sendDate) : new Date();

    const navigate = useNavigate();

    // Get hours and minutes
    const hours = date.getHours().toString().padStart(2, "0"); // Ensure two digits
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits

    const time = `${hours}:${minutes}`;

    const handleUpdate = async () => {
        const value = {
            status: "accepted",
        };
        try {
            const response = await updateStatus({
                id,
                value,
            }).unwrap();
            if (response) {
                if (!isLoading) {
                    navigate(`/request/${id}`);
                }
            }
        } catch (error) {
            if (isError) {
                toast.error("Erreur");
            }
        }
    };

    return (
        <div
            onClick={() => handleUpdate()}
            className='border border-gray-700 py-5 px-6 rounded-md bg-gray-200 flex gap-4 items-center'
        >
            <p className='text-gray-500 font-semibold flex-1'>{note}</p>
            <span>{time}</span>
        </div>
    );
};

export default Card;
