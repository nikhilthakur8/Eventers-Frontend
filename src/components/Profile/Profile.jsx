/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Check, Edit2, LogOut } from "lucide-react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import male from "../../assets/male.png";
import female from "../../assets/female.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/user";
import LoadingBar from "react-top-loading-bar";
import ClipLoader from "react-spinners/ClipLoader";
import { SuccessBanner } from "../SuccessBanner";
import { useNavigate } from "react-router-dom";
import { AlertBanner } from "../AlertBanner";
import { validateFileSize } from "../../hooks/validateFileSize";
export const Profile = () => {
    // State
    const [gender, setGender] = useState();
    const [image, setImage] = useState(
        "https://cdn-icons-png.flaticon.com/512/219/219970.png"
    );
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false);
    const [message, setMessage] = useState(null);
    const [axiosError, setAxiosError] = useState(null);
    const dispatch = useDispatch();
    const loadingBar = useRef(null);
    const userDetails = useSelector((state) => state.userData);
    const navigate = useNavigate();
    document.title = "Profile - Eventers";
    // Importing Fields from react-hook-form
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
    } = useForm();

    // For image preview
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "profileImg") {
                if (typeof value.profileImg[0] === "string")
                    setImage(value.profileImg[0]);
                else imagePreview(value.profileImg[0]);
            }
            if (name === "course") {
                setSelected(true);
            }
            if (name === "gender") {
                setGender(value.gender);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // Form Submit
    const onSubmit = (data) => {
        setLoading(true);
        loadingBar.current.continuousStart();
        data = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== "")
        );
        data.profileImg = data.profileImg[0];
        axios
            .post("api/v1/user/profile", data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                setValueInForm(data);
                dispatch(login(data));
                setMessage("Profile Updated Successfully");
            })
            .catch((err) => {
                err.response && err.response.length > 0
                    ? err.message
                    : err.response.data;
            })
            .finally(() => {
                loadingBar.current.complete();
                setLoading(false);
            });
    };

    // Setting default Value in Form
    useEffect(() => {
        if (userDetails) setValueInForm(userDetails);
    }, [userDetails]);

    function setValueInForm(data) {
        Object.keys(data).forEach((fieldName) => {
            setValue(fieldName, data[fieldName]);
        });
    }

    // Image Preview Function
    const imagePreview = (file) => {
        if (file) {
            const image = URL.createObjectURL(file);
            setImage(image);
        }
    };
    const handleLogout = () => {
        axios
            .get("api/v1/user/logout")
            .then(() => {
                setMessage("Logged out successfully");
                dispatch(login(null));
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch((err) => {
                setAxiosError(
                    err.response && err.response.length > 0
                        ? err.response.data
                        : err.message
                );
            });
    };
    return (
        <div className="w-full sm:w-2/3 md:w-3/5 mx-auto shadow-lg rounded-lg my-5 ">
            <LoadingBar color="rgb(40 130 246)" height={7} ref={loadingBar} />
            <AlertBanner message={axiosError} setError={setAxiosError} />
            <SuccessBanner message={message} setMessage={setMessage} />
            <div className="flex justify-center py-7">
                <div className="inline relative ">
                    <img
                        className="rounded-full w-36 h-36 object-cover"
                        src={image}
                    />
                    <label
                        htmlFor="profileImg"
                        className="absolute bottom-0 right-0 rounded-full overflow-hidden"
                    >
                        <Edit2
                            size={35}
                            className="text-gray-300 hover:bg-gray-700 bg-black  p-2 "
                        />
                    </label>
                </div>
            </div>
            {errors["profileImg"] && (
                <p className="text-red-600 -mt-4 text-sm text-center">
                    * {errors["profileImg"]?.message}
                </p>
            )}
            <div className="p-5 pt-0 ">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <input
                        type="file"
                        id="profileImg"
                        accept="image/*"
                        hidden
                        {...register("profileImg", {
                            validate: validateFileSize,
                        })}
                    />
                    <div className="flex justify-between gap-x-4">
                        <Input
                            label="First Name"
                            type="text"
                            name="firstName"
                            errors={errors}
                            {...register("firstName")}
                            watch={watch("firstName")}
                        />
                        <Input
                            label="Last Name"
                            type="text"
                            name="lastName"
                            errors={errors}
                            {...register("lastName", {
                                required: false,
                                pattern: {
                                    value: /^[a-zA-Z0-9\s&'(),.-]+$/,
                                    message: "Invalid Last Name",
                                },
                            })}
                            watch={watch("lastName")}
                        />
                    </div>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        errors={errors}
                        disabled
                        {...register("email")}
                        watch={watch("email")}
                    />

                    {/* Gender Select Input */}

                    <h1 className="text-lg mt-3 font-medium cursor-text text-gray-500  bg-white">
                        Gender
                    </h1>
                    <div className="flex items-center gap-x-5 flex-wrap justify-evenly mt-3">
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            hidden
                            {...register("gender", {
                                required: "Gender is required",
                            })}
                        />
                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            hidden
                            {...register("gender", {
                                required: "Gender is required",
                            })}
                        />
                        <label
                            htmlFor="male"
                            className={`border-2 font-medium  flex-1   text-lg p-3 rounded-xl text-center ${
                                gender === "male" &&
                                "border-blue-900 bg-blue-100 text-blue-900"
                            }`}
                            onClick={() => setGender("male")}
                        >
                            <img className="w-6 mx-auto" src={male} alt="" />
                            Male
                        </label>
                        <label
                            htmlFor="female"
                            className={`border-2 flex-1 font-medium  border-gray-3 00 text-lg p-3 rounded-xl text-center ${
                                gender === "female" &&
                                "border-blue-900 bg-blue-100 text-blue-900"
                            }`}
                            onClick={() => setGender("female")}
                        >
                            <img className="w-6 mx-auto" src={female} alt="" />
                            Female
                        </label>
                    </div>
                    {errors["gender"] && (
                        <p className="text-red-600 mt-1 text-sm">
                            * {errors["gender"]?.message}
                        </p>
                    )}

                    {/* make a select option for select courses */}
                    <label
                        htmlFor="course"
                        className="block text-lg mt-5 font-medium cursor-text text-gray-500  bg-white"
                    >
                        Select Course
                    </label>
                    <div className="relative">
                        <select
                            name="course"
                            id="course"
                            className={`py-2.5 mt-2  w-full px-3 rounded-lg bg-white  border  focus:outline-blue-500  appearance-none relative z-10 ${
                                selected
                                    ? "  font-serif"
                                    : "text-gray-500 text-lg font-semibold border-gray-300"
                            }`}
                            {...register("course", {
                                required: "Course is required",
                            })}
                            defaultValue={""}
                        >
                            <option value="" className="text-gray-300" disabled>
                                Select an option
                            </option>
                            <option value="1-Year MBA">1-Year MBA</option>
                            <option value="2-Year MBA">2-Year MBA</option>
                            <option value="BBA (Graduation)">
                                BBA (Graduation)
                            </option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="M.Tech">M.Tech</option>
                            <option value="Integrated/Dual Degree">
                                Integrated/Dual Degree
                            </option>
                            <option value="Others">Others</option>
                        </select>
                        <div className="absolute top-6 z-10 rotate-180 text-blue-800 right-4 pointer-events-none w-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgb(30 64 175)"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M18 15l-6-6-6 6" />
                            </svg>
                        </div>
                        {errors["course"] && (
                            <p className="text-red-600 mt-1 text-sm">
                                * {errors["course"]?.message}
                            </p>
                        )}
                    </div>
                    <Input
                        name="courseSpecialisation"
                        label="Course Specialisation"
                        type="text"
                        errors={errors}
                        {...register("courseSpecialisation", {
                            required: "Course Specialisation is required",
                            pattern: {
                                value: /^[a-zA-Z0-9\s&'(),.-]+$/,
                                message: "Invalid Course Specialisation",
                            },
                        })}
                        watch={watch("courseSpecialisation")}
                    />

                    <Input
                        name="college"
                        label="College Name"
                        type="text"
                        errors={errors}
                        {...register("collegeName", {
                            required: "College Name is required",
                            pattern: {
                                value: /^[a-zA-Z0-9\s&'(),.-]+$/,
                                message: "Invalid College Name",
                            },
                        })}
                        watch={watch("collegeName")}
                    />

                    <Input
                        name="location"
                        label="Location"
                        type="text"
                        errors={errors}
                        {...register("location", {
                            required: "Location is required",
                            pattern: {
                                value: /^[a-zA-Z0-9\s&'(),.-]+$/,
                                message: "Invalid  Location",
                            },
                        })}
                        watch={watch("location")}
                    />

                    <div className="flex items-center mb-5 mt-10 justify-between">
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-400 text-white font-semibold flex items-center space-x-2 py-2 px-10 text-lg rounded-lg"
                            onClick={handleLogout}
                        >
                            <p>Logout</p>
                            <LogOut size={20} />
                        </button>
                        <button
                            type={loading ? "button" : "text"}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-10 rounded-lg"
                        >
                            {!loading && (
                                <>
                                    <Check className="inline mr-2" />
                                    Save
                                </>
                            )}
                            <ClipLoader
                                size={30}
                                loading={loading}
                                color="white"
                            />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
