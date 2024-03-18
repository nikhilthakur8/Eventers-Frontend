import React, { useEffect, useRef } from "react";
import RTE from "../RTE";
import { Button } from "./Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { AlertBanner } from "../../../AlertBanner";
import { useState } from "react";
import axios from "axios";
import { setEventData } from "../../../../features/user";
import { useParams } from "react-router-dom";
import { SuccessBanner } from "../../../SuccessBanner";
export const AboutEvent = ({ onClick }) => {
    const {
        formState: { errors },
        setValue,
        control,
        handleSubmit,
    } = useForm();
    const ref = useRef(null);
    const dispatch = useDispatch();
    const { eventNumber } = useParams();
    const [axiosError, setAxiosError] = useState(null);
    const [message, setMessage] = useState(null);
    const eventData = useSelector((state) => state.eventData);

    // onSubmit Function
    function onSubmit(data) {
        ref.current.continuousStart();
        data.eventNumber = eventNumber;
        axios
            .post(
                `/api/v1/event/create/${eventNumber}/step3/aboutEvent`,
                data,
                {
                    withCredentials: true,
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
        setValue("aboutEvent", eventData.aboutEvent);
    }, []);

    return (
        <>
            <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />
            <SuccessBanner message={message} setMessage={setMessage} />
            <AlertBanner message={axiosError} setError={setAxiosError} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-5 sm:p-10">
                    <h1 className="text-3xl font-bold font-serif text-blue-900 mb-5">
                        About Event
                    </h1>
                    <RTE
                        label="About The Event"
                        name="aboutEvent"
                        control={control}
                    />
                </div>
                <Button onClick={onClick} />
            </form>
        </>
    );
};
