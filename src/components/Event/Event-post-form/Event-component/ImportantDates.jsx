/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Plus, Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setError, setMessage } from "../../../../features/user";
export const ImportantDates = ({ onClick, eventData, setEventData }) => {
    const [fileName, setFileName] = useState("Choose File");
    const { eventNumber } = useParams();
    const dispatch = useDispatch();
    const defaultValue = {
        dateTitle: "",
        date: getCurrentTimeInISFormat(),
    };
    function getCurrentTimeInISFormat(date) {
        const time = new Date();
        const timeOffset = 5.5 * 60 * 60 * 1000;
        const newDate = new Date(time.getTime() + timeOffset);
        return newDate.toISOString().slice(0, 16);
    }
    const {
        register,
        watch,
        setValue,
        formState: { errors },
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
            ["contactDetails"]: [{ name: "", number: "" }],
            ["importantDates"]: [defaultValue],
        },
    });
    const {
        fields: importantDatesFields,
        append: appendImportantDates,
        remove: removeImportantDates,
    } = useFieldArray({
        control,
        name: "importantDates",
    });
    const {
        fields: contactDetailsFields,
        append: appendContactDetails,
        remove: removeContactDetails,
    } = useFieldArray({
        control,
        name: "contactDetails",
    });
    const ref = useRef(null);
    function onSubmit(data) {
        ref.current.continuousStart();
        if (data?.eventBrochure && !(typeof data.eventBrochure === "string")) {
            data.eventBrochure = data.eventBrochure[0];
        }
        data.eventNumber = eventNumber;
        data = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== "")
        );
        axios
            .post(
                `/api/v1/event/create/${eventNumber}/step3/importantDate`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then(({ data }) => {
                setEventData(data);
                dispatch(setMessage("Saved Successfully"));
            })
            .catch((error) => {
                dispatch(setError(error?.response.data || error.message));
            })
            .finally(() => {
                ref.current.complete();
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

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "eventBrochure") {
                if (typeof value.eventBrochure === "string") {
                    setFileName(value.eventBrochureTitle + ".pdf");
                } else {
                    setFileName(value.eventBrochure[0].name);
                }
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [watch]);

    function setValueInForm(data) {
        Object.keys(data).forEach((fieldName) => {
            setValue(fieldName, data[fieldName]);
        });
    }
    useEffect(() => {
        setValueInForm(eventData);
    }, [eventData]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />
                <div className="p-5 sm:p-10">
                    <div className="my-5 shadow-lg px-3 sm:px-5 py-5 rounded-md shadow-gray-300">
                        <h1 className="text-3xl font-bold font-serif text-blue-900 mb-5">
                            Important Dates
                        </h1>
                        <>
                            <button
                                className="bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:bg-blue-700"
                                onClick={() =>
                                    appendImportantDates(defaultValue)
                                }
                            >
                                Add Dates
                            </button>
                            {importantDatesFields.map(
                                (importantDates, index) => (
                                    <div
                                        className="mt-5 flex space-x-2"
                                        key={importantDates.id}
                                    >
                                        <div className="w-full flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    name={"dateTitle"}
                                                    placeholder={"Date Title"}
                                                    className="w-full rounded-md text-blue-800  font-semibold border border-gray-400  px-3 py-2.5 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 "
                                                    {...register(
                                                        `importantDates.${index}.dateTitle`,
                                                        {
                                                            required:
                                                                "Name is Required",
                                                            min: {
                                                                value: 3,
                                                                message:
                                                                    "Minimum 3 characters",
                                                            },
                                                        }
                                                    )}
                                                />
                                                {errors["importantDates"] && (
                                                    <p className="text-red-600 mt-1 ml-2 text-xs">
                                                        {
                                                            errors[
                                                                "importantDates"
                                                            ][`${index}`]
                                                                ?.dateTitle
                                                                ?.message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-center border border-gray-400 rounded-md overflow-hidden">
                                                    <input
                                                        type="datetime-local"
                                                        id="datetimeInput"
                                                        className="outline-none text-lg py-2 bg-transparent font-medium"
                                                        name="datetimeInput"
                                                        min={getCurrentTimeInISFormat()}
                                                        {...register(
                                                            `importantDates.${index}.date`,
                                                            {
                                                                required:
                                                                    "Please select a date",
                                                                min: {
                                                                    value: getCurrentTimeInISFormat(),
                                                                    message:
                                                                        "Please select a valid date",
                                                                },
                                                            }
                                                        )}
                                                    />
                                                </div>
                                                {errors["importantDates"] && (
                                                    <p className="text-red-600 mt-1 text-xs">
                                                        {
                                                            errors[
                                                                "importantDates"
                                                            ][`${index}`]
                                                                ?.number
                                                                ?.message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="sm:self-start sm:py-2.5"
                                            onClick={() =>
                                                removeImportantDates(index)
                                            }
                                        >
                                            <Trash2 color="darkblue" />
                                        </button>
                                    </div>
                                )
                            )}
                        </>
                    </div>
                    <div className="my-5 shadow-lg px-3 sm:px-5 py-5 rounded-md shadow-gray-300">
                        <h1 className="text-3xl font-bold font-serif text-blue-900 mb-5">
                            Important Contact
                        </h1>
                        <div className="flex justify-between items-center mt-5">
                            <h1
                                className="text-md font-semibold text-blue-800 bg-white px-1"
                                htmlFor="registrationStartDate"
                            >
                                Contact Details
                            </h1>
                            <button
                                type="button"
                                onClick={() =>
                                    appendContactDetails({
                                        name: "",
                                        number: "",
                                    })
                                }
                            >
                                <Plus color="darkblue" />
                            </button>
                        </div>
                        {contactDetailsFields.map((contact, index) => (
                            <div
                                className="mt-5 flex space-x-2"
                                key={contact.id}
                            >
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
                                                    required:
                                                        "Name is Required",
                                                    min: {
                                                        value: 2,
                                                        message:
                                                            "Minimum 2 characters",
                                                    },
                                                }
                                            )}
                                        />
                                        {errors["contactDetails"] && (
                                            <p className="text-red-600 mt-1 text-xs">
                                                {
                                                    errors["contactDetails"][
                                                        `${index}`
                                                    ]?.name?.message
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
                                                        required:
                                                            "Number is Required",
                                                        pattern: {
                                                            value: /^[0-9]{10}$/,
                                                            message:
                                                                "Invalid Number",
                                                        },
                                                    }
                                                )}
                                            />
                                        </div>
                                        {errors["contactDetails"] && (
                                            <p className="text-red-600 mt-1 text-xs">
                                                {
                                                    errors["contactDetails"][
                                                        `${index}`
                                                    ]?.number?.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="sm:self-start sm:py-2.5"
                                    onClick={() => removeContactDetails(index)}
                                >
                                    <Trash2 color="darkblue" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="my-5 shadow-lg px-3 sm:px-5 py-5 rounded-md shadow-gray-300">
                        <h1 className="text-3xl font-bold font-serif text-blue-900 mb-5">
                            Event Brochure
                        </h1>
                        <div className="flex sm:space-x-4 sm:space-y-0 space-y-4 sm:flex-row flex-col items-center">
                            <div className="w-full">
                                <input
                                    type="text"
                                    placeholder={"Attachment Title Name"}
                                    className="w-full rounded-md font-semibold  border border-gray-400 px-3 py-2.5 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 "
                                    {...register("eventBrochureTitle", {
                                        required: false,
                                        min: {
                                            value: 3,
                                        },
                                    })}
                                />
                                {errors["eventBrochureTitle"] && (
                                    <p className="text-red-600 mt-1  ml-2 text-xs">
                                        {errors["eventBrochureTitle"]?.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="eventBrochure"
                                    className="w-full cursor-pointer items-center justify-center flex"
                                >
                                    <input
                                        name="eventBrochure"
                                        type="file"
                                        id="eventBrochure"
                                        accept="application/pdf,application/vnd.ms-excel"
                                        hidden
                                        {...register("eventBrochure", {
                                            // required:
                                            // "Event Banner is Required",
                                            validate: validateFileSize,
                                        })}
                                    />
                                    <Upload
                                        strokeWidth={2}
                                        size={44}
                                        className="bg-blue-900 p-2.5 inline text-white rounded-l-md"
                                    />
                                    <p className="inline w-full h-11 bg-blue-100 leading-10 text-center  rounded-r-md font-semibold overflow-hidden">
                                        {fileName}
                                    </p>
                                </label>
                                {errors["eventBrochure"] && (
                                    <p className="text-red-600 mt-1 ml-2 text-xs">
                                        {errors["eventBrochure"]?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={onClick} />
            </form>
        </>
    );
};
