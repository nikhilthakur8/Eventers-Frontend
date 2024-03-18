import { Link, useNavigate } from "react-router-dom";
import { Input } from "../service";
import {
    ArrowRightIcon,
    CheckCircle,
    EyeIcon,
    EyeOffIcon,
    Verified,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AlertBanner } from "../AlertBanner";
import LoadingBar from "react-top-loading-bar";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { GoogleOAuth } from "../GoogleOAuth";

function Signup() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const loadingBar = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    document.title = "Signup - Eventers";
    const {
        formState: { errors },
        register,
        handleSubmit,
        watch,
        reset,
    } = useForm();

    function onSubmit(data) {
        loadingBar.current.continuousStart();
        setIsLoading(true);
        setMessage(null);
        axios
            .post("/api/v1/user/signup", data)
            .then(({ data }) => {
                setMessage(data);
            })
            .catch((error) => {
                setError(error.response ? error.response.data : error.message);
            })
            .finally(() => {
                loadingBar.current.complete();
                setIsLoading(false);
            });
    }

    return (
        <div className="flex flex-col items-center px-5 sm:px-0 py-14 lg:py-20 mx-auto sm:w-2/3 md:max-w-md">
            <LoadingBar color="rgb(59 130 246)" height={7} ref={loadingBar} />
            <AlertBanner message={error} setError={setError} />
            <div className="w-full">
                <h1 className="text-3xl text-center font-bold">
                    Sign up to Eventers
                </h1>
                <div className="flex justify-center space-x-2 text-base mt-2 mb-3 py-2">
                    <p className="text-gray-500">Already have an account?</p>
                    <Link
                        to="/login"
                        className="text-blue-500 font-medium border-b-2 hover:border-blue-500 border-transparent transition-all duration-100"
                    >
                        Sign In
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col"
                    autoComplete="off"
                >
                    <div className="flex gap-x-4">
                        <Input
                            label="First Name"
                            type={"text"}
                            name={"firstName"}
                            errors={errors}
                            {...register("firstName", {
                                required: "First Name is required",
                                pattern: {
                                    value: /^[a-zA-Z' -]+$/,
                                    message: "Only Alphabet is allowed",
                                },
                            })}
                        />
                        <Input
                            label="Last Name"
                            type={"text"}
                            name={"lastName"}
                            errors={errors}
                            {...register("lastName", {
                                required: false,
                                pattern: {
                                    value: /^[a-zA-Z' -]+$/,
                                    message: "Only Alphabet is allowed",
                                },
                            })}
                        />
                    </div>
                    <Input
                        label="Email Address"
                        type={"email"}
                        name={"email"}
                        errors={errors}
                        autoComplete="off"
                        {...register("email", {
                            required: "Email address is required",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                                message: "Invalid Email",
                            },
                        })}
                        watch={watch("email")}
                    />
                    <div className="relative">
                        <Input
                            label="Password"
                            name={"password"}
                            type={isPasswordVisible ? "text" : "password"}
                            errors={errors}
                            autoComplete="off"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=\S{8,}$).+/,
                                    message: "Password of 8 charaters",
                                },
                            })}
                            watch={watch("password")}
                        />
                        <button
                            className="absolute  mr-4 right-0 top-9 text-gray-500 hover:text-black"
                            type="button"
                            onClick={() =>
                                setIsPasswordVisible((prev) => !prev)
                            }
                        >
                            {isPasswordVisible ? (
                                <EyeOffIcon className="text-black" size={25} />
                            ) : (
                                <EyeIcon size={25} />
                            )}
                        </button>
                    </div>
                    {message && (
                        <div className="mt-5 text-bold flex space-x-2 items-center py-2 px-5 text-lg font-medium text-blue-500 bg-blue-100">
                            <CheckCircle size={20} />
                            <p>{message}</p>
                        </div>
                    )}
                    <p className="text-black text-xs mt-3 mx-1.5">
                        By proceeding, you are indicating that you have read and
                        agree to our{" "}
                        <Link to="/PrivacyPolicy" className="underline">
                            Privacy Policy
                        </Link>
                    </p>

                    <button
                        type={isLoading ? "button" : "text"}
                        className="flex flex-row bg-blue-600 hover:bg-blue-500 shadow-lg text-white justify-center font-semibold items-center p-2 mt-5 rounded-sm"
                    >
                        {!isLoading && (
                            <>
                                <p className="text-xl mr-3">Create Account</p>
                                <ArrowRightIcon size={22} />
                            </>
                        )}
                        <ClipLoader
                            size={30}
                            loading={isLoading}
                            color="white"
                        />
                    </button>
                </form>
            </div>
            <div className="flex items-center w-full my-5">
                <div className="flex-1 border-t-2 border-gray-300"></div>
                <div className="mx-4 text-gray-500 font-bold">OR</div>
                <div className="flex-1 border-t-2 border-gray-300"></div>
            </div>
            <GoogleOAuth />
        </div>
    );
}

export default Signup;
