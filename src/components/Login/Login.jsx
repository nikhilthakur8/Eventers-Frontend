import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRightIcon,
    EyeIcon,
    EyeOffIcon,
    LucideUnlockKeyhole,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../service";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import LoadingBar from "react-top-loading-bar";
import { AlertBanner } from "../AlertBanner";
import { useDispatch } from "react-redux";
import { login, setError } from "../../features/user";
import { GoogleOAuth } from "../GoogleOAuth";
function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const loadingBar = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    document.title = "Login - Eventers";
    const {
        formState: { errors },
        register,
        handleSubmit,
        watch,
    } = useForm();

    function onSubmit(data) {
        loadingBar.current.continuousStart();
        setIsLoading(true);
        axios
            .post("/api/v1/user/login", data, {
                withCredentials: true,
            })
            .then(({ data }) => {
                dispatch(login(data));
                navigate("/");
            })
            .catch((error) => {
                dispatch(
                    setError(
                        error.response && error.response.length > 0
                            ? error.message
                            : error.response.data
                    )
                );
            })
            .finally(() => {
                loadingBar.current.complete();
                setIsLoading(false);
            });
    }

    return (
        <div className="flex flex-col items-center px-5 sm:px-0 py-14 lg:py-20 mx-auto sm:w-2/3 md:max-w-md">
            <LoadingBar color="rgb(59 130 246)" height={7} ref={loadingBar} />
            <div className="w-full">
                <h1 className="text-3xl text-center font-bold">
                    Login your account
                </h1>
                <div className="flex justify-center space-x-2 text-[0.95rem] sm:text-base  mt-2 mb-3 py-2">
                    <p className="text-gray-500">Don&apos;t have an account?</p>
                    <Link
                        to="/signup"
                        className="text-blue-500 font-medium border-b-2 hover:border-blue-500 border-transparent transition-all duration-100"
                    >
                        Create a account
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col "
                >
                    <Input
                        label="Email Address"
                        type={"email"}
                        errors={errors}
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
                            type={isPasswordVisible ? "text" : "password"}
                            errors={errors}
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
                    <Link
                        to="/forgot-password"
                        className="flex items-center text-sm font-medium text-blue-500 hover:text-blue-400 mt-2"
                    >
                        <LucideUnlockKeyhole size={17} className="mx-2" />
                        <p>Forgot Your Password?</p>
                    </Link>
                    <button className="flex flex-row bg-blue-600 hover:bg-blue-500 shadow-lg text-white justify-center font-semibold items-center p-2 mt-8 rounded-sm">
                        {!isLoading && (
                            <>
                                <p className="text-xl mr-3">Get started</p>
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

export default Login;
