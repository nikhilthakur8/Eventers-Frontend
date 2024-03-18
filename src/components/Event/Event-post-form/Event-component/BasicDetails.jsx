/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Button } from "./Button";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { Select } from "../Select";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEventData } from "../../../../features/user";
import { AlertBanner } from "../../../AlertBanner";
import LoadingBar from "react-top-loading-bar";
import { SuccessBanner } from "../../../SuccessBanner";
export const BasicDetails = ({ onClick }) => {
    const eventData = useSelector((state) => state.eventData);
    const { eventNumber } = useParams();
    const dispatch = useDispatch();
    const [modeOfEvent, setModeOfEvent] = useState();
    const [image, setImage] = useState(
        "https://buffer.com/library/content/images/2023/10/free-images.jpg"
    );
    const [axiosError, setAxiosError] = useState(null);
    const [message, setMessage] = useState(null);
    const ref = useRef(null);
    const {
        register,
        setValue,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm();

    function onSubmit(data) {
        ref.current.continuousStart();
        if (data?.eventLogo && !(typeof data.eventLogo === "string")) {
            data.eventLogo = data.eventLogo[0];
        }
        data.eventNumber = eventNumber;
        data = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== "")
        );
        axios
            .post(
                `/api/v1/event/create/${eventNumber}/step3/basicdetails`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then(({ data }) => {
                dispatch(setEventData(data));
                setMessage("Success");
            })
            .catch((error) => {
                setAxiosError(error?.response.data || error.message);
            })
            .finally(() => {
                ref.current.complete();
            });
    }

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "modeOfEvent") {
                setModeOfEvent(value.modeOfEvent);
            }
            if (name === "eventLogo") {
                if (typeof value.eventLogo === "string")
                    setImage(value.eventLogo);
                else filePreview(value.eventLogo[0]);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // function for file Preview
    function filePreview(file) {
        if (file) {
            const image = URL.createObjectURL(file);
            setImage(image);
        }
    }
    // function to validate the size of file
    const validateFileSize = (fileList) => {
        const maxSize = 10 * 1024 * 1024;
        if (fileList[0] && fileList[0].size > maxSize) {
            return "File size should not exceed 10MB";
        } else {
            return true;
        }
    };

    // function to Set value in Form
    function setValueInForm(data) {
        if (data)
            Object.keys(data).forEach((fieldName) => {
                setValue(fieldName, data[fieldName]);
            });
    }

    useEffect(() => {
        setValueInForm(eventData);
    }, [eventData]);
    return (
        <div>
            <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />
            <AlertBanner message={axiosError} setError={setAxiosError} />
            <SuccessBanner message={message} setMessage={setMessage} />
            <form
                onSubmit={handleSubmit(onSubmit)}
                encType={"multipart/form-data"}
            >
                <div className="p-5 sm:p-10">
                    <h1 className="text-3xl font-bold font-serif text-blue-900 mb-5">
                        Event Basic Details & Registration
                    </h1>
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
                                        message:
                                            "Minimum 3 characters required",
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
                                        message:
                                            "Minimum 3 characters required",
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
                                        message:
                                            "Minimum 3 characters required",
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
                                            required:
                                                "Mode of Event is required",
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
                                            required:
                                                "Mode Of Event is required",
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
                </div>
                <Button onClick={onClick} />
            </form>
        </div>
    );
};
