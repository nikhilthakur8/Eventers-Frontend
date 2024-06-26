/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../features/user";

export const FetchEventData = (eventNumber) => {
    const dispatch = useDispatch();
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
                // dispatch(
                //     setError(
                //         error.response ? error.response.data : error.message
                //     )
                // );
            });
    }, [eventNumber]);

    return { eventData, setEventData };
};
