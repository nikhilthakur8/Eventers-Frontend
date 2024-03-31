/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../features/user";
import { useNavigate } from "react-router-dom";

export const FetchEventData2 = (eventNumber) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    useEffect(() => {
        axios
            .get(`/api/v1/event/details/${eventNumber}`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                setEventData(data);
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    setError(
                        error.response ? error.response.data : error.message
                    )
                );
                setTimeout(() => {
                    if (error?.response?.status == 404) {
                        navigate("/event/category");
                    }
                }, 2000);
            });
    }, [eventNumber]);

    return { eventData, setEventData };
};
