/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../Input";
import { Trash2 } from "lucide-react";
import { Button } from "./Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setEventData } from "../../../../features/user";
import { useDispatch, useSelector } from "react-redux";
import { AlertBanner } from "../../../AlertBanner";
import LoadingBar from "react-top-loading-bar";
import { SuccessBanner } from "../../../SuccessBanner";
export const Prizes = ({ onClick }) => {
    const defaultValue = {
        rank: "",
        cashAmount: "",
    };
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: {
            ["prizes"]: defaultValue,
        },
    });
    const [message, setMessage] = useState(null);
    const { eventNumber } = useParams();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "prizes",
    });
    const eventData = useSelector((state) => state.eventData);
    useEffect(() => {
        if (eventData) setValueInForm(eventData);
    }, [eventData]);
    function setValueInForm(data) {
        Object.keys(data).forEach((fieldName) => {
            setValue(fieldName, data[fieldName]);
        });
    }
    const ref = useRef(null);
    const [axiosError, setAxiosError] = useState();
    const dispatch = useDispatch();
    function onSubmit(data) {
        ref.current.continuousStart();
        data.eventNumber = eventNumber;
        axios
            .post(`/api/v1/event/create/${eventNumber}/step3/prizes`, data, {
                withCredentials: true,
            })
            .then(({ data }) => {
                dispatch(setEventData(data));
                setMessage("Saved Successfully");
            })
            .catch((error) => {
                setAxiosError(error?.response.data || error?.message);
            })
            .finally(() => {
                ref.current.complete();
            });
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AlertBanner message={axiosError} setError={setAxiosError} />
                <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />
                <SuccessBanner message={message} setMessage={setMessage} />
                <div className="p-5 sm:p-10">
                    <h1 className="text-3xl font-bold font-serif text-blue-900 mb-5">
                        Prizes
                    </h1>
                    <button
                        className="bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:bg-blue-700"
                        onClick={() => append(defaultValue)}
                    >
                        Add Prizes
                    </button>
                    {fields.map((prize, index) => (
                        <div
                            key={prize.id}
                            className="shadow-lg px-3 sm:px-5 py-5 rounded-md shadow-gray-300 flex justify-center items-center space-x-5"
                        >
                            <div className="w-full">
                                <Input
                                    label="Rank"
                                    name="rank"
                                    type="number"
                                    required
                                    placeholder="Enter Rank"
                                    {...register(`prizes[${index}].rank`, {
                                        required: "Rank is Required",
                                        min: {
                                            value: 1,
                                            message: "Minimum 2 characters",
                                        },
                                    })}
                                />
                                {errors["prizes"] && (
                                    <p className="text-red-600 mt-1 ml-2 text-xs">
                                        {
                                            errors["prizes"][`${index}`]?.rank
                                                ?.message
                                        }
                                    </p>
                                )}
                                <Input
                                    label="Prize"
                                    name="cashAmount"
                                    type="number"
                                    required
                                    message="Please ensure that the prize amount is specified in Indian Rupees (INR) if it is in cash."
                                    placeholder="Enter Prize for Rankers"
                                    {...register(
                                        `prizes[${index}].cashAmount`,
                                        {
                                            required: "Prize is Required",
                                            min: {
                                                value: 2,
                                                message: "Minimum 2 characters",
                                            },
                                        }
                                    )}
                                />
                                {errors["prizes"] && (
                                    <p className="text-red-600 mt-1 ml-2 text-xs">
                                        {
                                            errors["prizes"][`${index}`]
                                                ?.cashAmount?.message
                                        }
                                    </p>
                                )}
                            </div>
                            <div className="mt-5">
                                <button
                                    type="button"
                                    className="sm:self-start sm:py-2.5"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 color="darkblue" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <Button onClick={onClick} />
            </form>
        </>
    );
};
