/** @format */

import React, { useEffect } from "react";
import { logout, setUser, useGetMeQuery } from "../states/slices/authSlice";
import { AppDispatch, RootState } from "../states/store";
import { useDispatch, useSelector } from "react-redux";
import { CiBellOn } from "react-icons/ci";
import Notification from "../components/Notification";
import { BiLogOut } from "react-icons/bi";

const Home: React.FC = () => {
    const { data, isLoading } = useGetMeQuery({});
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!isLoading && data?.user) {
            dispatch(setUser(data?.user));
        }
    }, [isLoading, data?.user]);

    return (
        <div className='h-screen bg-[#f4f4f4]'>
            <div className='h-20 shadow-md w-full px-6 flex items-center justify-between'>
                <div className='avatar'>
                    <div className='w-14 rounded-full'>
                        <img src={user?.avatar!} />
                    </div>
                </div>
                <div className='h-10 w-10 bg-white rounded-md relative flex items-center justify-center shadow-md'>
                    <CiBellOn size={25} />
                    <span className='fixed top-2 right-5 z-20 bg-gray-800 text-white text-[9px] p-1 rounded-full'>
                        20
                    </span>
                </div>
            </div>
            <Notification />
            <div className='px-6 py-2 h-20 flex items-center'>
                <button
                    onClick={() => {
                        dispatch(logout());
                    }}
                >
                    <BiLogOut size={30} />
                </button>
            </div>
        </div>
    );
};

export default Home;
