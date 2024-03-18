import { ArrowRightIcon, CheckCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../service";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SuccessBanner } from "../SuccessBanner";
import ClipLoader from "react-spinners/ClipLoader";
import { AlertBanner } from "../AlertBanner";

function ForgotPasswordPage() {
    const { id, token } = useParams();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function onSubmit(data) {
        setLoading(true);
        axios
            .post(`/api/v1/user/${id}/reset-password/${token}`, data)
            .then(({ data }) => {
                setMessage(data);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch((error) => {
                setError(
                    error.response && error.response.length > 0
                        ? error.message
                        : error.response.data
                );
            })
            .finally(() => setLoading(false));
    }
    return (
        <div className="flex flex-col items-center px-5 sm:px-0 py-24 lg:py-36 mx-auto sm:w-2/3 md:max-w-md">
            <AlertBanner message={error} setError={setError} />
            <SuccessBanner message={message} setMessage={setMessage} />
            <div className="w-full">
                <h1 className="text-3xl text-center font-bold">
                    Reset Password
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col mt-6 w-full"
                >
                    <div className="relative">
                        <Input
                            label="New password"
                            type={isPasswordVisible ? "text" : "password"}
                            errors={errors}
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=\S{8,}$).+/,
                                    message: "Password of 8 charaters",
                                },
                            })}
                        />

                        <button
                            className="absolute  mr-4 right-0 top-9 text-gray-500 hover:text-black"
                            type="button"
                            onClick={() =>
                                setIsPasswordVisible((prev) => !prev)
                            }
                        >
                            {isPasswordVisible ? (
                                <EyeOffIcon size={25} />
                            ) : (
                                <EyeIcon size={25} />
                            )}
                        </button>
                    </div>
                    {/* <Input
                        label="Re-enter New password"
                        type={isPasswordVisible ? "text" : "password"}
                        errors={errors}
                        {...register("reEnterPassword", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=\S{8,}$).+/,
                                message: "Password of 8 charaters",
                            },
                        })}
                    /> */}
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
        </div>
    );
}

export default ForgotPasswordPage;
