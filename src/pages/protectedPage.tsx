/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../states/store";

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const location = useLocation();
    const token = useSelector((state: RootState) => state.auth.token);
    if (!token)
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    return children;
};

export default ProtectedPage;
