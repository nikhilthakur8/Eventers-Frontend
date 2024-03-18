/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { EventCard } from "./EventCard";
import { EventDetails } from "./EventDetails";
import { ArrowLeft, ChevronDown, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AlertBanner } from "../AlertBanner";
import { setSearchBar } from "../../features/user";
import LoadingBar from "react-top-loading-bar";

export const EventSearch = () => {
    document.title = "Search Event - Eventers";
    const [allEvent, setAllEvent] = useState([]);
    const [filteredEvent, setFilteredEvent] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [cardClick, setCardClick] = useState(0);
    const [isClicked, setClick] = useState();
    const [eventData, setEventData] = useState(null);
    const [eventType, setEventType] = useState();
    const { search } = useLocation();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(search);
    const type = queryParams.get("type");
    const searchQuery = useSelector((state) => state.searchBar);
    const [axiosError, setAxiosError] = useState(null);
    const [loading, setLoading] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        window.scrollBy(-20000, -20000);
    }, [cardClick]);

    useEffect(() => {
        if (allEvent && allEvent.length > 0 && searchQuery) {
            const filteredEvent = allEvent.filter(
                ({ eventName, festivalName, organisationName }) =>
                    eventName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    festivalName
                        ?.toLowerCase()
                        ?.includes(searchQuery.toLowerCase()) ||
                    organisationName
                        ?.toLowerCase()
                        ?.includes(searchQuery.toLowerCase())
            );
            setEventData(filteredEvent[0]);
            setCardClick(0);
            setFilteredEvent(filteredEvent);
        } else {
            setFilteredEvent([]);
            setCardClick(0);
            setEventData(allEvent[0]);
        }
    }, [searchQuery]);

    // Get All Events
    useEffect(() => {
        setLoading(true);
        if (type) {
            setEventType(type);
        } else {
            ref.current.continuousStart();
            axios
                .get("/api/v1/event/get-all")
                .then((response) => {
                    if (response.data?.length > 0) {
                        setAllEvent(response.data);
                        setEventData(response.data[0]);
                    }
                })
                .catch((error) => {
                    setAxiosError(
                        error.response ? error.response.data : error.message
                    );
                })
                .finally(() => {
                    setLoading(false);
                    ref.current.complete();
                });
        }
    }, []);

    // const handleTouchStart = (e) => {
    //     if (isVisible) {
    //         const handleTouchMove = (e) => {
    //             const deltaY = e.touches[0].clientY - 85;
    //             if (document.getElementById("bar")) {
    //                 document.getElementById(
    //                     "bar"
    //                 ).style.transform = `translate(0px, ${deltaY}px)`;
    //                 setCardClick(null);
    //             }
    //             if (deltaY > window.innerHeight / 6) {
    //                 setIsVisible(false);
    //                 setCardClick(-1);
    //             }
    //         };

    //         const handleTouchEnd = () => {
    //             if (document.getElementById("bar"))
    //                 document.getElementById(
    //                     "bar"
    //                 ).style.transform = `translate(0px, 0px)`;
    //             document.removeEventListener("touchmove", handleTouchMove);
    //             document.removeEventListener("touchend", handleTouchEnd);
    //         };

    //         document.addEventListener("touchmove", handleTouchMove);
    //         document.addEventListener("touchend", handleTouchEnd);
    //     }
    // };
    // const handleMouseDown = (e) => {
    //     if (isVisible) {
    //         const handleMouseMove = (e) => {
    //             const deltaY = e.clientY - 85;
    //             if (document.getElementById("bar")) {
    //                 document.getElementById(
    //                     "bar"
    //                 ).style.transform = `translate(0px, ${deltaY}px)`;
    //                 setCardClick(null);
    //             }

    //             if (deltaY > window.innerHeight / 6) {
    //                 setIsVisible(false);
    //                 setCardClick(-1);
    //             }
    //         };

    //         const handleMouseUp = () => {
    //             if (document.getElementById("bar"))
    //                 document.getElementById(
    //                     "bar"
    //                 ).style.transform = `translate(0px, 0px)`;
    //             document.removeEventListener("mousemove", handleMouseMove);
    //             document.removeEventListener("mouseup", handleMouseUp);
    //         };

    //         document.addEventListener("mousemove", handleMouseMove);
    //         document.addEventListener("mouseup", handleMouseUp);
    //     }
    // };

    useEffect(() => {
        document.getElementById("bar")?.scrollBy(-2000, -2000);
    }, [eventData]);
    // For Event Sorting
    useEffect(() => {
        setLoading(true);
        if ((eventType && eventType.length > 0) || isClicked)
            ref.current.continuousStart();
        axios
            .get(
                `/api/v1/event/find?${
                    isClicked ? `modeOfEvent=${isClicked}` : ""
                }${
                    eventType
                        ? `&eventType=${encodeURIComponent(eventType)}`
                        : ""
                }`
            )
            .then((response) => {
                setAllEvent(response.data);
                setEventData(response.data[0]);
                setCardClick(0);
            })
            .catch((error) => {
                setAxiosError(
                    error.response ? error.response.data : error.message
                );
            })
            .finally(() => {
                setLoading(false);
                ref.current.complete();
            });
    }, [isClicked, eventType]);

    return (
        <div className="bg-gray-50">
            <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />

            <AlertBanner message={axiosError} setError={setAxiosError} />
            <div className="w-11/12 mx-auto flex flex-wrap justify-start  items-center ">
                <div className="relative mt-4 ">
                    <select
                        className="outline-none text-white bg-blue-600 rounded-full py-2 appearance-none px-5"
                        onChange={(e) => setEventType(e.target.value)}
                        defaultValue={type}
                    >
                        <option value="" className=" text-black bg-white">
                            All
                        </option>
                        <option
                            value="Hackathon & Coding Challenges"
                            className=" text-black bg-white"
                        >
                            Hackathon & Coding Challenges
                        </option>
                        <option
                            value="Webinars & Workshops"
                            className=" text-black bg-white"
                        >
                            Webinars & Workshops
                        </option>
                        <option
                            value="Cultural Event"
                            className=" text-black bg-white"
                        >
                            Cultural Event
                        </option>
                        <option value="Fest" className=" text-black bg-white">
                            Fest
                        </option>
                        <option
                            value="Quizzes"
                            className=" text-black bg-white"
                        >
                            Quizzes
                        </option>
                        <option
                            value="Competitions & Challenges"
                            className=" text-black bg-white"
                        >
                            Competitions & Challenges
                        </option>
                    </select>
                    <div className="absolute top-2.5 text-white right-5">
                        <ChevronDown size={20} />
                    </div>
                </div>
                <div className="mt-4">
                    <input
                        type="radio"
                        name="eventType"
                        value={"Offline"}
                        hidden
                        id="offline"
                    />
                    <label
                        htmlFor="offline"
                        className={`border border-blue-900 ${
                            isClicked == "Offline" && "bg-blue-600 text-white"
                        } rounded-full mx-2 py-2 px-3 font-medium`}
                        onClick={() => setClick("Offline")}
                    >
                        Offline
                    </label>
                    <label
                        htmlFor="online"
                        className={`border border-blue-900 ${
                            isClicked == "Online" && "bg-blue-600 text-white"
                        } rounded-full mx-2 py-2 px-3 font-medium`}
                        onClick={() => setClick("Online")}
                    >
                        Online
                    </label>
                    <input
                        type="radio"
                        name="eventType"
                        value={"Online"}
                        hidden
                        id="online"
                    />
                </div>
                <div className="inline-flex items-center mt-4   md:hidden border-gray-400 border overflow-hidden rounded-lg ">
                    <h1 className="text-white bg-blue-700 px-3 py-1.5 ">
                        Search now
                    </h1>
                    <input
                        className="focus:outline-none  px-3 py-1.5  placeholder:text-gray-300"
                        placeholder="Search Events"
                        type="search"
                        onChange={(e) => dispatch(setSearchBar(e.target.value))}
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 py-5 lg:w-11/12 mx-auto ">
                <div className="lg:col-span-4 md:col-span-5 col-span-12 min-h-[65vh] overflow-auto  sm:no-scrollbar hide-scrollbar  px-5 ">
                    {(searchQuery ? filteredEvent : allEvent).map(
                        (event, index) => (
                            <button
                                key={index + Math.random()}
                                className={`block w-full border
                            ${
                                cardClick == index && "border-blue-700 border-2"
                            } border-blue-200 bg-white rounded-lg my-5 relative cursor-pointer`}
                                onClick={() => {
                                    setCardClick(index);
                                    setEventData(event);
                                    setIsVisible(true);
                                }}
                            >
                                <EventCard eventData={event} />
                            </button>
                        )
                    )}
                </div>
                {isVisible && (
                    <div
                        className="lg:col-span-8  md:col-span-7 col-span-12 w-full  absolute top-28 bg-white  md:static sm:no-scrollbar hide-scrollbar h-[82vh]  overflow-auto"
                        id="bar"
                    >
                        <div
                            className="md:hidden  sticky top-0 py-3 cursor-pointer z-50 shadow-lg bg-white"
                            // onMouseDown={handleMouseDown}
                            // onTouchStart={handleTouchStart}
                        >
                            <X
                                className="ml-auto mr-5 font-bold active:rotate-90 hover:rotate-90 transition duration-300 text-blue-900"
                                size={30}
                                onClick={() => {
                                    setTimeout(() => {
                                        setIsVisible(false);
                                        setCardClick(-1);
                                    }, 300);
                                }}
                            />
                        </div>
                        {eventData && !loading ? (
                            <EventDetails eventData={eventData} />
                        ) : loading ? (
                            <div className="h-full flex justify-center items-center opacity-50 ">
                                <AlertBanner
                                    message={axiosError}
                                    setError={setAxiosError}
                                />
                                <p className="text-4xl font-bold font-serif border-8 p-2 border-y-blue-900 border-x-gray-400 rounded-tr-xl rounded-bl-xl ">
                                    Eventers
                                </p>
                            </div>
                        ) : (
                            <div className="w-full  h-full flex justify-center items-center flex-col">
                                <p className="font-bold font-serif text-3xl my-2">
                                    No Event Found 🥲
                                </p>
                                <Link
                                    to={"/"}
                                    className="bg-black items-center text-white px-4 py-2 rounded-md font-semibold my-4 flex "
                                >
                                    <ArrowLeft
                                        className="inline-block mr-2"
                                        size={20}
                                    />
                                    <p>Back to Home</p>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
