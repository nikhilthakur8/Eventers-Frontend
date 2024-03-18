import React, { useState } from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { ArrowRightIcon, CheckCircle } from "lucide-react";
import axios from "axios";
import { AlertBanner } from "../AlertBanner";
import ClipLoader from "react-spinners/ClipLoader";

export const ForgotPasswordEmail = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [message, setMessage] = useState(null);
    const [axiosError, setAxiosError] = useState(null);
    const [loading, setLoading] = useState(false);
    const onSubmit = (data) => {
        setLoading(true);
        setMessage(null);
        axios
            .post("/api/v1/user/forgot-password", data)
            .then(({ data }) => {
                setMessage(data);
            })
            .catch((error) => {
                setAxiosError(
                    error.response && error.response.length > 0
                        ? error.message
                        : error.response.data
                );
            })
            .finally(() => setLoading(false));
    };
    return (
        <div className="flex flex-col items-center px-5 sm:px-0 py-24 lg:py-36 mx-auto sm:w-2/3 md:max-w-md">
            <AlertBanner message={axiosError} setError={setAxiosError} />
            <h1 className="text-3xl text-center font-bold">Forgot Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Input
                    label="Email Address"
                    type="email"
                    errors={errors}
                    {...register("email", {
                        required: "Email Address is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                            message: "Invalid Email Address",
                        },
                    })}
                />
                {message && (
                    <div className="mt-5 text-bold flex space-x-2 items-center py-2 px-5 text-lg font-medium text-blue-500 bg-blue-100">
                        <CheckCircle size={20} />
                        <p>{message}</p>
                    </div>
                )}
                <button className=" w-full flex bg-blue-600 hover:bg-blue-500 shadow-lg text-white justify-center font-semibold items-center p-2 mt-8 rounded-sm">
                    {!loading && (
                        <>
                            <p className="text-xl mr-3">Reset Now</p>
                            <ArrowRightIcon size={22} />
                        </>
                    )}
                    <ClipLoader size={30} loading={loading} color="white" />
                </button>
            </form>
        </div>
    );
};
