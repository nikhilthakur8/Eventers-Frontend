/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

export const FetchEventData = (eventNumber) => {
    const [eventData, setEventData] = useState(null);
    useEffect(() => {
        axios
            .get(`/api/v1/event/details/${eventNumber}`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                console.log(data);
                setEventData(data);
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }, [eventNumber]);

    return eventData;
};
