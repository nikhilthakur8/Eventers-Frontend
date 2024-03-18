/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeft, ArrowRight, Plus, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { login, setEventData } from "../../../features/user";
import { useDispatch, useSelector } from "react-redux";
import { AlertBanner } from "../../AlertBanner";
import { SuccessBanner } from "../../SuccessBanner";
export const EventFormStepII = () => {
    const { eventNumber } = useParams();
    const ref = useRef(null);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const type = queryParams.get("type");
    const [participationType, setParticipationType] = useState();
    const dispatch = useDispatch();
    const eventData = useSelector((state) => state.eventData);
    const navigate = useNavigate();
    const [axiosError, setAxiosError] = useState(null);
    const [message, setMessage] = useState(null);
    document.title = "Create Event Step-II - Eventers";
    // React Hook Form
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
        control,
    } = useForm({
        defaultValues: {
            startDate: create(),
            endDate: create(),
            ["contactDetails"]: [{ name: "", number: "" }],
        },
    });
    function setValueInForm(data) {
        Object.keys(data).forEach((fieldName) => {
            if (fieldName === "startDate" || fieldName === "endDate") {
                setValue(fieldName, data[fieldName].slice(0, 16));
            } else {
                setValue(fieldName, data[fieldName]);
            }
        });
    }

    const { fields, append, remove } = useFieldArray({
        control,
        name: "contactDetails",
    });
    useEffect(() => {
        axios
            .get(`/api/v1/event/details/${eventNumber}`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                dispatch(setEventData(data));
            })
            .catch((error) => {
                setAxiosError(
                    error.response ? error.response.data : error.message
                );
                setTimeout(() => {
                    if (error?.response?.status == 404) {
                        navigate("/event/category");
                    }
                }, 2000);
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (eventData && eventData?.eventNumber == eventNumber)
            setValueInForm(eventData);
    }, [eventData]);

    // useEffect hook for watching values
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "participationType")
                setParticipationType(value.participationType);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [watch]);

    // Function for International format indian time
    function create() {
        const time = new Date();
        const timeOffset = 5.5 * 60 * 60 * 1000;
        const newDate = new Date(time.getTime() + timeOffset);
        return newDate.toISOString();
    }
    // Onsubmit function
    function onSubmit(data) {
        ref.current.continuousStart();
        data.eventNumber = eventNumber;
        axios
            .post(`/api/v1/event/create/${eventNumber}/step2`, data, {
                withCredentials: true,
            })
            .then(({ data }) => {
                dispatch(setEventData(data));
                setMessage("Step II completed successfully");
                setTimeout(() => {
                    navigate(
                        `/event/create/${eventNumber}/step3?type=${encodeURIComponent(
                            type
                        )}`
                    );
                }, 2000);
            })
            .catch((error) => {
                setAxiosError(error?.response.data || error?.message);
                setTimeout(() => {
                    if (error?.response?.status == 401) {
                        navigate("/login");
                    }
                    if (error?.response?.status == 404) {
                        navigate("/event/category");
                    }
                }, 2000);
            })
            .finally(() => {
                ref.current.complete();
            });
    }

    return (
        <div className="p-5 sm:w-2/3 md:w-3/5 w-full mx-auto min-h-screen">
            <AlertBanner message={axiosError} setError={setAxiosError} />
            <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />
            <SuccessBanner message={message} setMessage={setMessage} />
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <h1
                    className="text-md font-semibold mb-3  text-blue-800 bg-white px-1"
                    htmlFor="registrationStartDate"
                >
                    Participation Type
                    <p className="ml-1 text-red-600 inline">*</p>
                </h1>
                <div className="flex w-full gap-x-3  mt-3">
                    <input
                        type="radio"
                        name="participationType"
                        id="individual"
                        hidden
                        value={"individual"}
                        {...register("participationType", {
                            required: "Required",
                        })}
                    />
                    <input
                        type="radio"
                        name="participationType"
                        id="team"
                        hidden
                        value={"team"}
                        {...register("participationType", {
                            required: "Required",
                        })}
                    />
                    <label
                        htmlFor="individual"
                        className={`border-2 font-medium w-full  text-md p-3 rounded-xl text-center ${
                            participationType === "individual" &&
                            "border-blue-900 bg-blue-100 text-blue-900"
                        }`}
                        onClick={() => setParticipationType("individual")}
                    >
                        <img
                            className="w-6 mx-auto"
                            src="https://img.icons8.com/ios-glyphs/30/person-male.png"
                            alt=""
                        />
                        Individual
                    </label>
                    <label
                        htmlFor="team"
                        className={`border-2 w-full font-medium   text-md p-3 rounded-xl text-center ${
                            participationType === "team" &&
                            "border-blue-900 bg-blue-100 text-blue-900"
                        }`}
                        onClick={() => setParticipationType("team")}
                    >
                        <img
                            className="w-6 mx-auto"
                            src={
                                "https://img.icons8.com/material-sharp/24/conference-call.png"
                            }
                            alt=""
                        />
                        Team
                    </label>
                </div>
                {errors["participationType"] && (
                    <p className="text-red-600 mt-1 text-sm">
                        * {errors["participationType"]?.message}
                    </p>
                )}
                {participationType === "team" && (
                    <div className=" mt-5 ">
                        <h1 className="text-md  font-semibold  text-blue-800 bg-white px-1">
                            Team Size
                            <p className="ml-2 text-red-600 inline">*</p>
                        </h1>
                        <div className="flex gap-x-3">
                            <div className="w-full">
                                <label
                                    htmlFor="minTeam"
                                    className="text-sm font-semibold  text-blue-800 bg-white px-1"
                                >
                                    Min
                                </label>

                                <input
                                    id="minTeam"
                                    type="number"
                                    defaultValue={1}
                                    className="w-full flex-1 rounded-md border  border-gray-400 mt-2 px-3 py-2.5 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...register("minTeam", {
                                        required: "Required",
                                        min: {
                                            value: 1,
                                            message: "Minimum 1 team member",
                                        },
                                    })}
                                />
                                {errors["minTeam"] && (
                                    <p className="text-red-600 mt-1 text-sm">
                                        * {errors["minTeam"]?.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="maxTeam"
                                    className="text-sm font-semibold  text-blue-800 bg-white px-1"
                                >
                                    Max
                                </label>
                                <input
                                    id="maxTeam"
                                    type="number"
                                    defaultValue={4}
                                    className="w-full rounded-md border  border-gray-400 mt-2 px-3 py-2.5 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...register("maxTeam", {
                                        required: "Required",
                                        min: {
                                            value: 2,
                                            message: "Minimum 2 team member",
                                        },
                                    })}
                                />
                                {errors["maxTeam"] && (
                                    <p className="text-red-600 mt-1 text-sm">
                                        * {errors["maxTeam"]?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <h1
                    className="text-md font-semibold my-4  text-blue-800 bg-white px-1"
                    htmlFor="registrationStartDate"
                >
                    Registration Start Date & Time
                    <p className="ml-1 text-red-600 inline">*</p>
                </h1>
                <div className="flex justify-center border border-gray-400 rounded-lg">
                    <input
                        type="datetime-local"
                        id="datetimeInput"
                        name="datetimeInput"
                        {...register("startDate", {
                            required: "Please select a date",
                        })}
                        className="outline-none text-lg py-2 bg-transparent font-medium"
                    />
                </div>
                {errors["startDate"] && (
                    <p className="text-red-600 mt-1 text-sm">
                        * {errors["startDate"]?.message}
                    </p>
                )}
                <h1
                    className="text-md font-semibold my-4  text-blue-800 bg-white px-1"
                    htmlFor="registrationStartDate"
                >
                    Registration End Date & Time
                    <p className="ml-1 text-red-600 inline">*</p>
                </h1>
                <div className="flex justify-center border border-gray-400 rounded-lg">
                    <input
                        className="outline-none bg-transparent text-lg py-2 font-medium "
                        type="datetime-local"
                        id="datetimeInput"
                        name="datetimeInput"
                        {...register("endDate", {
                            required: "Please select a date",
                        })}
                    />
                </div>
                {errors["endDate"] && (
                    <p className="text-red-600 mt-1 text-sm">
                        * {errors["endDate"]?.message}
                    </p>
                )}
                <div className="flex justify-between items-center mt-5">
                    <h1
                        className="text-md font-semibold text-blue-800 bg-white px-1"
                        htmlFor="registrationStartDate"
                    >
                        Contact Details
                    </h1>
                    <button
                        type="button"
                        onClick={() => append({ name: "", number: "" })}
                    >
                        <Plus color="darkblue" />
                    </button>
                </div>
                {fields.map((contact, index) => (
                    <div className="mt-5 flex space-x-2" key={contact.id}>
                        <div className="w-full flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name={"name"}
                                    placeholder={"Name"}
                                    className="w-full rounded-md text-blue-800  font-semibold border border-gray-400  px-3 py-2.5 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 "
                                    {...register(
                                        `contactDetails.${index}.name`,
                                        {
                                            required: "Name is Required",
                                            min: {
                                                value: 2,
                                                message: "Minimum 2 characters",
                                            },
                                        }
                                    )}
                                />
                                {errors["contactDetails"] && (
                                    <p className="text-red-600 mt-1 text-xs">
                                        {
                                            errors["contactDetails"][`${index}`]
                                                ?.name?.message
                                        }
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <div className="flex items-center border border-gray-400 rounded-md overflow-hidden">
                                    <p className="py-2.5 bg-blue-900 text-white font-semibold text-md h-full px-3">
                                        +91
                                    </p>
                                    <input
                                        type="number"
                                        name={"number"}
                                        placeholder={"8479XXXXX"}
                                        className="w-full text-blue-900 appearance-none font-semibold    px-3 py-2.5 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1  "
                                        {...register(
                                            `contactDetails.${index}.number`,
                                            {
                                                required: "Number is Required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "Invalid Number",
                                                },
                                            }
                                        )}
                                    />
                                </div>
                                {errors["contactDetails"] && (
                                    <p className="text-red-600 mt-1 text-xs">
                                        {
                                            errors["contactDetails"][`${index}`]
                                                ?.number?.message
                                        }
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="sm:self-start sm:py-2.5"
                            onClick={() => remove(index)}
                        >
                            <Trash2 color="darkblue" />
                        </button>
                    </div>
                ))}

                <div className="h-20 md:h-24 fixed bottom-0 left-0 bg-gray-100 z-30 w-full flex items-center">
                    <div className="sm:w-2/3 md:w-3/5 sm:mx-auto w-full sm:px-5 mx-5 text-end flex justify-between">
                        <Link to={`/event/create/${eventNumber}/step1`}>
                            <button
                                type="button"
                                className="border-gray-400 border md:text-xl font-semibold hover:bg-black hover:text-white py-2 px-5 sm:px-10 shadow-sm shadow-black rounded-xl"
                            >
                                <ArrowLeft className="inline mr-2" size={22} />
                                Back
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-500 md:text-xl hover:bg-blue-700 text-white font-bold py-1 px-5 sm:px-10 shadow-sm shadow-black rounded-xl"
                        >
                            Next
                            <ArrowRight className="inline ml-2" size={22} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
