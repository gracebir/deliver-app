/** @format */

import React from "react";

type TextInputProps = {
    label: string;
    placeholder: string;
    error: string;
    touched: boolean;
    name: string;
    value: string | number;
    type: React.HTMLInputTypeAttribute;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
};

const TextInput: React.FC<TextInputProps> = ({
    label,
    type,
    placeholder,
    touched,
    handleChange,
    error,
    name,
    value,
    handleBlur,
}) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>{label}</label>
            <input
                className='outline-none w-full px-4 py-2 border border-[#cdcccc] focus:border-[#373737] rounded-md'
                type={type}
                value={value}
                name={name}
                onBlur={handleBlur}
                placeholder={placeholder}
                onChange={handleChange}
            />
            {error && touched ? (
                <span className='text-xs text-red-400 italic'>{error}</span>
            ) : null}
        </div>
    );
};

export default TextInput;
