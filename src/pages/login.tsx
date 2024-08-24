/** @format */

import { useFormik } from "formik";
import React from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { loginSchema } from "../utils/validateSchema";
import { setToken, useSigninMutation } from "../states/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../states/store";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [signin, { isLoading, error, isError }] = useSigninMutation();
    const dispatch: AppDispatch = useDispatch();
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues: {
                phone_number: "",
                password: "",
            },
            validationSchema: loginSchema,
            onSubmit: async (value) => {
                try {
                    const response = await signin(value).unwrap();
                    if (response) {
                        dispatch(setToken(response?.access_token));
                        navigate("/");
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        });
    return (
        <main className='min-h-screen bg-[#f4f4f4]'>
            <div className='w-full h-[70vh] flex items-center px-6'>
                <div className='max-w-lg mx-auto flex-1 flex flex-col gap-4'>
                    <div>
                        <h1 className='text-center font-bold text-2xl'>
                            Bienvenue
                        </h1>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-4 p-12 border bg-white shadow rounded-md'
                    >
                        <TextInput
                            handleBlur={handleBlur}
                            error={errors.phone_number!}
                            touched={touched.phone_number!}
                            value={values.phone_number}
                            name='phone_number'
                            placeholder='e.g. +2267...'
                            handleChange={handleChange}
                            label='Numero de telephone'
                            type='text'
                        />
                        <TextInput
                            handleBlur={handleBlur}
                            error={errors.password!}
                            touched={touched.password!}
                            value={values.password}
                            name='password'
                            placeholder='*************'
                            handleChange={handleChange}
                            label='Mot de passe'
                            type='password'
                        />
                        <Button
                            isLoading={isLoading}
                            type='submit'
                            text='entrer'
                        />
                        {isError && (
                            //@ts-ignore
                            <ErrorMessage text={error?.data?.message} />
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
