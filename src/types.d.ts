/** @format */

declare type UserType = {
    _id: string;
    phone_number: string;
    fullname: string;
    avatar: string | null;
};

declare type RequestType = {
    _id: string;
    senderId: string;
    receiverId: string;
    note: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    status: string;
    createdAt: string;
    updatedAt: string;
};
