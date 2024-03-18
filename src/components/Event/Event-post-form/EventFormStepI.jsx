/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import { Select } from "./Select";
import { FormProvider, useForm } from "react-hook-form";
import { ArrowRight, History } from "lucide-react";
import RTE from "./RTE";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import ClipLoader from "react-spinners/ClipLoader";
import { AlertBanner } from "../../AlertBanner";
import { setEventData } from "../../../features/user";
import { SuccessBanner } from "../../SuccessBanner";
export const EventFormStepI = () => {
    // URL Operations
    const { eventNumber } = useParams();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const type = queryParams.get("type");
    const [message, setMessage] = useState(null);
    const userDetails = useSelector((state) => state.userData);
    const ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [axiosError, setAxiosError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const eventData = useSelector((state) => state.eventData);
    document.title = "Create Event Step-I - Eventers";

    // React-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
        setValue,
    } = useForm();

    // On Form Submit Function
    function onSubmit(data) {
        setLoading(true);
        ref.current.continuousStart();
        data.eventLogo = data.eventLogo[0];
        data.eventNumber = eventNumber;
        data = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== "")
        );
        axios
            .post(`/api/v1/event/create/${eventNumber}/step1`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                dispatch(setEventData(data));
                setMessage("Step I completed successfully");
                setTimeout(() => {
                    navigate(
                        `/event/create/${eventNumber}/step2/?type=${encodeURIComponent(
                            data.eventType
                        )}`
                    );
                }, 2000);
            })
            .catch((error) => {
                setAxiosError(
                    error.response ? error.response.data : error.message
                );
                setTimeout(() => {
                    if (error?.response?.status == 401) {
                        navigate("/login");
                    }
                }, 2000);
            })
            .finally(() => {
                ref.current.complete();
                setLoading(false);
            });
    }

    // Fetch Event Data
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setEventData(null));
        axios
            .get(`/api/v1/event/details/${eventNumber}`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                dispatch(setEventData(data));
            });
    }, []);

    // useEffect for setting intial value
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "modeOfEvent") {
                setModeOfEvent(value.modeOfEvent);
            }
            if (name === "eventLogo") {
                if (typeof value.eventLogo === "string") {
                    setImage(value.eventLogo);
                } else filePreview(value.eventLogo[0]);
            }
            if (name === "eventType") {
                fetchEventAboutContent(value.eventType);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    //
    useEffect(() => {
        setValue("organisationName", userDetails?.collegeName);
        setValue("eventType", type);
        if (eventData) setValueInForm(eventData);
    }, [userDetails, type, eventData]);

    const fetchEventAboutContent = (type) => {
        axios
            .get(`/api/v1/event/content?type=${encodeURIComponent(type)}`)
            .then(({ data }) => {
                setValue("aboutEvent", data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // File Preview Function
    function filePreview(file) {
        if (file) {
            const image = URL.createObjectURL(file);
            setImage(image);
        }
    }

    function setValueInForm(data) {
        Object.keys(data).forEach((fieldName) => {
            setValue(fieldName, data[fieldName]);
        });
    }
    const validateFileSize = (fileList) => {
        const maxSize = 10 * 1024 * 1024;
        if (fileList[0] && fileList[0].size > maxSize) {
            return "File size should not exceed 10MB";
        } else {
            return true;
        }
    };
    const [image, setImage] = useState(
        "https://buffer.com/library/content/images/2023/10/free-images.jpg"
    );

    // Setting Mode of Event
    const [modeOfEvent, setModeOfEvent] = useState("");

    return (
        <div className="flex flex-col m-5 sm:w-2/3 md:w-3/5 sm:mx-auto">
            <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />
            <AlertBanner message={axiosError} setError={setAxiosError} />
            <SuccessBanner message={message} setMessage={setMessage} />
            <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                autoComplete="off"
            >
                <div className=" bg-gray-100  rounded-lg py-5 border border-dashed border-black flex  items-center flex-col">
                    <h1 className="text-xl font-medium text-blue-800">
                        Event Logo <p className="text-red-600 inline">*</p>
                    </h1>
                    <img
                        className=" h-40 w-40 my-2 object-cover rounded-t-lg "
                        src={image}
                    />
                    <input
                        type="file"
                        id="eventLogo"
                        className="hidden"
                        accept="image/*"
                        {...register("eventLogo", {
                            required: "Event Logo is required",
                            validate: validateFileSize,
                        })}
                    />

                    <label
                        htmlFor="eventLogo"
                        className="bg-blue-500 mx-auto hover:bg-blue-700 w-60 text-center p-2 rounded-b-lg text-white"
                    >
                        Change Event Photo
                    </label>
                    {errors["eventLogo"] && (
                        <p className="text-red-600 mt-1 -mb-2 text-sm text-center">
                            * {errors["eventLogo"]?.message}
                        </p>
                    )}
                </div>
                <div>
                    <div className="w-full mb-5">
                        <Select
                            name="eventType"
                            label="Event Type"
                            selectName="Choose Event Category"
                            options={[
                                "Hackathon & Coding Challenges",
                                "Webinars & Workshops",
                                "Fest",
                                "Quizzes",
                                "Cultural Event",
                                "Scholarships",
                                "Competitions & Challenges",
                            ]}
                            watch={watch("eventType")}
                            errors={errors}
                            {...register("eventType", {
                                required: "Event Type is required",
                                validate: (value) => {
                                    if (value) {
                                        return true;
                                    } else return "Event Type is required";
                                },
                            })}
                        />
                        <Input
                            name="eventName"
                            placeholder="Enter Event Name"
                            type="text"
                            label="Event Name"
                            required
                            errors={errors}
                            {...register("eventName", {
                                required: "Event Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters required",
                                },
                            })}
                        />
                        <Input
                            name="organizationName"
                            placeholder="Enter Organisation Name"
                            type="text"
                            label="Organisation Name"
                            required
                            errors={errors}
                            {...register("organisationName", {
                                required: "Organisation Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters required",
                                },
                            })}
                        />
                        <Input
                            name="festivalName"
                            placeholder="Festival Name"
                            type="text"
                            errors={errors}
                            label="Festival Name"
                            {...register("festivalName", {
                                required: false,
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters required",
                                },
                            })}
                        />
                        <Input
                            name="eventWebsite"
                            placeholder="Event URL: https://www.example.com"
                            type="text"
                            errors={errors}
                            label="Event Website URL"
                            className="lowercase text-blue-500"
                            message="The URL of Event Website or Organization Website"
                            {...register("eventWebsite", {
                                pattern: {
                                    value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_~.~#?&//=]*)/,
                                    message: "Invalid Website Address",
                                },
                            })}
                        />
                        <div className="flex items-center gap-x-5 flex-wrap justify-evenly mt-3">
                            <h1 className="text-md w-full mb-3 font-semibold text-blue-800 bg-white px-1">
                                Mode Of Event
                            </h1>

                            <label
                                htmlFor="1"
                                className={`border-2 font-medium flex-1 text-lg p-3 rounded-xl text-center ${
                                    modeOfEvent === "Online" &&
                                    "border-blue-900 bg-blue-100 text-blue-900"
                                }`}
                            >
                                <img
                                    src="https://img.icons8.com/ios-filled/50/online--v1.png"
                                    className="w-8 mx-auto"
                                    alt=""
                                />
                                Online
                                <input
                                    type="radio"
                                    name="modeOfEvent"
                                    value="Online"
                                    id="1"
                                    className="hidden"
                                    {...register("modeOfEvent", {
                                        required: "Mode of Event is required",
                                    })}
                                />
                            </label>
                            <label
                                htmlFor="0"
                                className={`border-2 font-medium flex-1 text-lg p-3 rounded-xl text-center ${
                                    modeOfEvent === "Offline" &&
                                    "border-blue-900 bg-blue-100 text-blue-900"
                                }`}
                            >
                                <img
                                    src="https://img.icons8.com/ios-filled/50/offline.png"
                                    className="w-8 mx-auto"
                                    alt=""
                                />
                                Offline
                                <input
                                    type="radio"
                                    name="modeOfEvent"
                                    value="Offline"
                                    id="0"
                                    className="hidden"
                                    {...register("modeOfEvent", {
                                        required: "Mode Of Event is required",
                                    })}
                                />
                            </label>
                        </div>
                        {errors["modeOfEvent"] && (
                            <p className="text-red-600 mt-1 text-sm">
                                * {errors["modeOfEvent"]?.message}
                            </p>
                        )}
                        {modeOfEvent === "Offline" && (
                            <>
                                <div className="flex gap-x-5">
                                    <Input
                                        name="countryName"
                                        placeholder="Country Name"
                                        type="text"
                                        errors={errors}
                                        required
                                        label="Country"
                                        {...register("countryName", {
                                            required: "Required",
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Minimum 3 characters required",
                                            },
                                        })}
                                    />
                                    <Input
                                        name="stateName"
                                        placeholder="State Name"
                                        type="text"
                                        required
                                        errors={errors}
                                        label="State"
                                        {...register("stateName", {
                                            required: "Required",
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Minimum 3 characters required",
                                            },
                                        })}
                                    />
                                </div>
                                <div className="flex gap-x-5">
                                    <Input
                                        name="cityName"
                                        placeholder="City Name"
                                        type="text"
                                        errors={errors}
                                        required
                                        label="City Name"
                                        {...register("cityName", {
                                            required: "Required",
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Minimum 3 characters required",
                                            },
                                        })}
                                    />
                                    <Input
                                        name="Location"
                                        placeholder="Location Name"
                                        type="text"
                                        errors={errors}
                                        label="Location"
                                        {...register("locationName", {
                                            required: false,
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Minimum 3 characters required",
                                            },
                                        })}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Real Time Editor */}
                <RTE
                    label="About The Event"
                    name="aboutEvent"
                    control={control}
                />
                <div className="h-20 fixed bottom-0 left-0 bg-gray-100 z-30 w-full flex items-center">
                    <div className="sm:w-2/3 md:w-3/5 sm:mx-auto w-full mx-5 text-end">
                        <button
                            type={loading ? "button" : "text"}
                            className="bg-blue-500 text-lg shadow-sm shadow-black hover:bg-blue-700 text-white font-bold py-2 px-5 sm:px-10  rounded-xl"
                        >
                            {!loading && (
                                <>
                                    Next
                                    <ArrowRight
                                        className="inline ml-2"
                                        size={22}
                                    />
                                </>
                            )}
                            <ClipLoader
                                size={30}
                                loading={loading}
                                color="white"
                            />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
