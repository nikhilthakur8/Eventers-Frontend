/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { useFieldArray, useForm } from "react-hook-form";
import { CalendarClockIcon, PenIcon, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { EditWrapper } from "./EditWrapper";
import { Input } from "../Input";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { setError, setMessage } from "../../../../features/user";

export const RoundsTimeline = ({ onClick, eventData, setEventData }) => {
    const { eventNumber } = useParams();
    const dispatch = useDispatch();
    const ref = useRef(null);
    const defaultValues = {
        title: "Offline Round",
        description:
            "This will be a Offline round! You will see the “Enter” button here, once the round is live.",
        startDate: getCurrentTimeInISFormat(),
        endDate: getCurrentTimeInISFormat(),
        isEliminatorRound: "true",
    };
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        watch,
    } = useForm({});
    const [axiosError, setAxiosError] = useState();
    function ConvertISOToString(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();
        const time = d.toLocaleTimeString().split(":");
        var timeString =
            time[0] +
            ":" +
            time[1] +
            " " +
            time[time.length - 1].split(" ")[1] +
            " IST";
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [day, month, year].join("-") + " " + timeString;
    }
    function getCurrentTimeInISFormat() {
        const date = new Date();
        const timeOffest = 5.5 * 60 * 60 * 1000;
        const newDate = new Date(date.getTime() + timeOffest);
        return newDate.toISOString().slice(0, 16);
    }

    function onSubmit(data) {
        data.eventNumber = eventNumber;
        ref.current.continuousStart();
        axios
            .post(`/api/v1/event/create/${eventNumber}/step3/rounds`, data, {
                withCredentials: true,
            })
            .then(({ data }) => {
                setEventData(data);
                dispatch(setMessage("Saved Successfully"));
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    setError(
                        error.response ? error.response.data : error.message
                    )
                );
            })
            .finally(() => {
                ref.current.complete();
            });
    }
    const { append, fields, remove } = useFieldArray({
        control,
        name: "rounds",
    });

    useEffect(() => {
        if (eventData) setValueInForm(eventData);
    }, [eventData]);
    function setValueInForm(data) {
        Object.keys(data).forEach((fieldName) => {
            setValue(fieldName, data[fieldName]);
        });
    }
    const [roundIndex, setRoundIndex] = useState(0);
    const [isRoundEditSectionOpen, setRoundEditSection] = useState(false);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-5 px-3 sm:p-10">
                    <h1 className="text-3xl font-bold font-serif text-blue-900 mb-5">
                        Rounds & Timeline
                    </h1>
                    <button
                        type="button"
                        className="bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:bg-blue-700"
                        onClick={() => append(defaultValues)}
                    >
                        Add Round
                    </button>
                    <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />

                    {fields.map((round, index) => (
                        <div
                            className="mt-5 flex border rounded-b-xl border-black p-3 bg-blue-200 border-dotted"
                            key={index}
                        >
                            <div className="bg-white w-full p-4 flex lg:flex-row flex-col space-x-4 lg:space-y-0 lg:justify-between space-y-5 rounded-xl shadow-2xl">
                                <div>
                                    <p className="font-semibold text-blue-700 text-lg">
                                        {round.title}
                                    </p>
                                    <p className="mt-2 text-sm">
                                        {round.description}
                                    </p>
                                    <div className="font-semibold text-blue-700 flex items-center mt-4 mb-2">
                                        <CalendarClockIcon
                                            strokeWidth={1}
                                            className="mr-2"
                                            size={30}
                                        />
                                        {ConvertISOToString(round.startDate)}
                                        {" - "}
                                        {ConvertISOToString(round.endDate)}
                                    </div>
                                    <p className=" text-sm">
                                        Eliminator Round:{" "}
                                        {round.isEliminatorRound == "true"
                                            ? "Yes"
                                            : "No"}
                                    </p>
                                </div>
                                <div className="self-end flex space-x-2">
                                    <button
                                        type="button"
                                        className="flex bg-blue-500 items-center rounded-md space-x-2 hover:bg-blue-700 text-white px-3 py-1.5"
                                        onClick={() => {
                                            setRoundEditSection(true);
                                            setRoundIndex(index);
                                        }}
                                    >
                                        <PenIcon size={15} />
                                        <p>Edit</p>
                                    </button>
                                    <button
                                        className="flex border border-black 
                                items-center rounded-md space-x-2 hover:bg-black hover:text-white px-2 py-1.5"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 size={15} />
                                        <p>Delete</p>
                                    </button>
                                </div>

                                {isRoundEditSectionOpen && (
                                    <EditWrapper w="w-3/5">
                                        <div className="p-5 sm:p-10">
                                            <h1 className="text-3xl font-bold font-serif text-blue-900 mb-5">
                                                Rounds Details Form
                                            </h1>
                                            <Input
                                                label={"Round Title"}
                                                required
                                                type="text"
                                                name={`rounds.${roundIndex}.title`}
                                                placeholder="Enter the Round Title"
                                                errors={errors}
                                                {...register(
                                                    `rounds.${roundIndex}.title`,
                                                    {
                                                        required:
                                                            "Round Title is required",
                                                        minLength: {
                                                            value: 3,
                                                            message:
                                                                "Minimum 3 characters required",
                                                        },
                                                    }
                                                )}
                                            />
                                            {errors["rounds"] && (
                                                <p className="text-red-600 mt-1 text-xs">
                                                    {
                                                        errors["rounds"][
                                                            `${roundIndex}`
                                                        ]?.title?.message
                                                    }
                                                </p>
                                            )}
                                            <Input
                                                label={"Description"}
                                                required
                                                type="text"
                                                errors={errors}
                                                name={`rounds.${roundIndex}.description`}
                                                placeholder="Enter Description of Round"
                                                {...register(
                                                    `rounds.${roundIndex}.description`,
                                                    {
                                                        required:
                                                            "This field is required",
                                                        minLength: {
                                                            value: 3,
                                                            message:
                                                                "Minimum 3 characters required",
                                                        },
                                                    }
                                                )}
                                            />
                                            {errors["rounds"] && (
                                                <p className="text-red-600 mt-1 text-xs">
                                                    {
                                                        errors["rounds"][
                                                            `${roundIndex}`
                                                        ]?.description?.message
                                                    }
                                                </p>
                                            )}
                                            <Input
                                                type="datetime-local"
                                                label={"Start Date"}
                                                required
                                                name={`rounds.${roundIndex}.startDate`}
                                                defaultValue={round.startDate}
                                                errors={errors}
                                                {...register(
                                                    `rounds.${roundIndex}.startDate`,
                                                    {
                                                        required:
                                                            "Start Date is Required",
                                                        min: {
                                                            value: getCurrentTimeInISFormat(),
                                                            message:
                                                                "Start Date cannot be in the past",
                                                        },
                                                    }
                                                )}
                                            />
                                            {errors["rounds"] && (
                                                <p className="text-red-600 mt-1 text-xs">
                                                    {
                                                        errors["rounds"][
                                                            `${roundIndex}`
                                                        ]?.startDate?.message
                                                    }
                                                </p>
                                            )}
                                            <Input
                                                type="datetime-local"
                                                label={"End Date"}
                                                required
                                                name={`rounds.${roundIndex}.endDate`}
                                                defaultValue={round.endDate}
                                                errors={errors}
                                                {...register(
                                                    `rounds.${roundIndex}.endDate`,
                                                    {
                                                        required:
                                                            "End Date is Required",
                                                        min: {
                                                            value: getCurrentTimeInISFormat(),
                                                            message:
                                                                "End Date cannot be before Start Date",
                                                        },
                                                    }
                                                )}
                                            />
                                            {errors["rounds"] && (
                                                <p className="text-red-600 mt-1 text-xs">
                                                    {
                                                        errors["rounds"][
                                                            `${roundIndex}`
                                                        ]?.endDate?.message
                                                    }
                                                </p>
                                            )}
                                            <div className="w-full mt-5">
                                                <h1 className="text-md font-semibold text-blue-800 bg-white px-1">
                                                    Is Eliminator Round?
                                                    <p className="ml-2 text-red-600 inline">
                                                        *
                                                    </p>
                                                </h1>
                                                <div className="flex mt-5 space-x-5">
                                                    <div>
                                                        <label
                                                            htmlFor="Yes"
                                                            className="text-lg mr-3 font-semibold text-white py-2 px-5 rounded-md bg-blue-500 hover:bg-blue-700"
                                                        >
                                                            Yes
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            id="Yes"
                                                            name="isEliminatorRound"
                                                            value={"true"}
                                                            {...register(
                                                                `rounds.${roundIndex}.isEliminatorRound`,
                                                                {
                                                                    required:
                                                                        "Eliminator Round is Required",
                                                                }
                                                            )}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="No"
                                                            className="text-lg mr-3 font-semibold text-white py-2 px-5 rounded-md bg-blue-500 hover:bg-blue-700"
                                                        >
                                                            No
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            id="No"
                                                            name="isEliminatorRound"
                                                            value={"false"}
                                                            {...register(
                                                                `rounds.${roundIndex}.isEliminatorRound`,
                                                                {
                                                                    required:
                                                                        "Eliminator Round is Required",
                                                                }
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                {errors["rounds"] && (
                                                    <p className="text-red-600 mt-3 text-xs">
                                                        {
                                                            errors["rounds"][
                                                                `${roundIndex}`
                                                            ]?.isEliminatorRound
                                                                ?.message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            w="3/5"
                                            onClick={() =>
                                                setRoundEditSection(false)
                                            }
                                        />
                                    </EditWrapper>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <Button onClick={onClick} />
            </form>
        </div>
    );
};
