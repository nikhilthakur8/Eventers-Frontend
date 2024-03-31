/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import {
    setError,
    setMessage,
} from "../../../../features/user";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
export const EventBanner = ({ onClick, eventData, setEventData }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        setValue,
    } = useForm();

    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const { eventNumber } = useParams();
    const ref = useRef(null);

    // onsubmit Function
    function onSubmit(data) {
        ref.current.continuousStart();
        if (data?.eventBanner) {
            data.eventBanner = data.eventBanner[0];
        }
        data.eventNumber = eventNumber;
        axios
            .post(
                `/api/v1/event/create/${eventNumber}/step3/eventBanner`,
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

    // useEffect for watching the fields
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == "eventBanner") {
                if (typeof value.eventBanner === "string")
                    setImage(value.eventBanner);
                else filePreview(value.eventBanner[0]);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch("eventBanner")]);

    useEffect(() => {
        if (eventData) {
            if (eventData.eventBanner)
                setValue("eventBanner", eventData?.eventBanner);
        }
    }, [eventData]);

    // file preview
    const filePreview = (file) => {
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setImage(fileUrl);
        }
    };
    // function to validate size
    const validateFileSize = (fileList) => {
        const maxSize = 10 * 1024 * 1024;
        if (fileList[0] && fileList[0].size > maxSize) {
            return "File size should not exceed 10MB";
        } else {
            return true;
        }
    };

    return (
        <>
            <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />
            <div className="p-5 sm:p-10">
                <h1 className="text-3xl font-bold font-serif text-blue-900 mb-5">
                    Event Banner
                </h1>
                <div className="border-dotted p-4 border-gray-500 border-2">
                    <img
                        src={image}
                        alt=""
                        className="w-full h-52 bg-gray-200 object-center"
                    />
                    {errors && errors["eventBanner"] && (
                        <p className="text-red-600 mt-2 text-sm text-center">
                            * {errors["eventBanner"]?.message}
                        </p>
                    )}
                </div>
                <label
                    htmlFor="eventBanner"
                    className="cursor-pointer items-center justify-center flex mt-5"
                >
                    <Upload
                        strokeWidth={2}
                        size={40}
                        className="bg-blue-900 p-2 inline text-white rounded-l-md"
                    />
                    <p className="bg-blue-100 font-semibold rounded-r-md py-2 px-5">
                        Upload Event Banner
                    </p>
                </label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="eventBanner"
                    type="file"
                    id="eventBanner"
                    hidden
                    accept="image/*"
                    {...register("eventBanner", {
                        required: "Event Banner is Required",
                        validate: validateFileSize,
                    })}
                />
                <Button onClick={onClick} />
            </form>
        </>
    );
};
