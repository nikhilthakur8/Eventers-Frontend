import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { EventCard } from "./EventCard";
import { Link } from "react-router-dom";
import { AlertBanner } from "../AlertBanner";
import { ArrowRight } from "lucide-react";
import LoadingBar from "react-top-loading-bar";
export const MyEvent = () => {
    const [myEvent, setMyEvent] = useState([]);
    const [filteredEvent, setFilteredEvent] = useState(null);
    const [axiosError, setAxiosError] = useState(null);
    const ref = useRef(null);
    document.title = "My Event - Eventers";
    function searchMyEvent(e) {
        const filterEvent = myEvent.filter((event) =>
            event.eventName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredEvent(filterEvent);
    }
    useEffect(() => {
        ref.current.continuousStart();
        axios
            .get("/api/v1/my/event")
            .then((response) => {
                if (response.data?.length > 0) {
                    setMyEvent(response.data);
                }
            })
            .catch((error) => {
                setAxiosError(
                    error.response ? error.response.data : error.message
                );
            })
            .finally(() => {
                ref.current.complete();
            });
    }, []);
    return (
        <div className="min-h-screen">
            <AlertBanner message={axiosError} setError={setAxiosError} />
            <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />
            <div className="sm:w-2/3 md:w-2/5 mx-auto flex px-5 sm:px-0 flex-wrap ">
                <div className="flex items-center mt-4 border-gray-400 border overflow-hidden rounded-lg w-full">
                    <label className="text-white bg-blue-700 block px-3 py-2">
                        Search&#160;Events
                    </label>
                    <input
                        className="focus:outline-none flex-1 px-3 py-2 placeholder:text-gray-400"
                        placeholder="Search Events"
                        type="text"
                        onChange={searchMyEvent}
                    />
                </div>
                {(filteredEvent || myEvent).map((event, index) => (
                    <Link
                        to={`/event/${event.eventNumber}`}
                        key={index}
                        className={`block w-full border h-fit border-blue-200 bg-white rounded-lg my-5 relative cursor-pointer`}
                    >
                        <EventCard eventData={event} />
                    </Link>
                ))}
                {!(myEvent && myEvent.length > 0) && (
                    <div className="w-full  min-h-[80vh]  flex justify-center items-center flex-col">
                        <p className="font-bold font-serif text-3xl my-2">
                            No Event Found 🥲
                        </p>
                        <Link
                            to={"/event/category"}
                            className="bg-black text-xl hover:bg-gray-900 items-center text-white px-4 py-2 rounded-md font-semibold my-4 flex "
                        >
                            <p>Create Now</p>
                            <ArrowRight
                                className="inline-block ml-3"
                                size={20}
                            />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
