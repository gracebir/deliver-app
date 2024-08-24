/** @format */

import React from "react";

type buttonProps = {
    text: string;
    isLoading?: boolean;
    type: "submit" | "reset" | "button" | undefined;
    handleClick?: () => void;
};

const Button: React.FC<buttonProps> = ({
    type,
    text,
    handleClick,
    isLoading = false,
}) => {
    return (
        <button
            className='bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm rounded-md w-full py-3'
            onClick={handleClick}
            type={type}
        >
            {isLoading ? (
                <span className='loading loading-spinner loading-lg'></span>
            ) : (
                text
            )}
        </button>
    );
};

export default Button;
