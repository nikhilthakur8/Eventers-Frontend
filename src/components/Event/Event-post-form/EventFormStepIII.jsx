import { useEffect, useRef, useState } from "react";
import { Box } from "./Box";
import {
    AlertCircleIcon,
    CalendarRangeIcon,
    Edit2,
    Eye,
    Medal,
    Menu,
    Newspaper,
    Server,
    StickerIcon,
} from "lucide-react";
import { EventBanner } from "./Event-component/EventBanner";
import { EditWrapper } from "./Event-component/EditWrapper";
import { BasicDetails } from "./Event-component/BasicDetails";
import { AboutEvent } from "./Event-component/AboutEvent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setError, setMessage } from "../../../features/user";
import { ImportantDates } from "./Event-component/ImportantDates";
import { RoundsTimeline } from "./Event-component/RoundsTimeline";
import { Prizes } from "./Event-component/Prizes";
import LoadingBar from "react-top-loading-bar";
import { Event } from "../Event";
import { FetchEventData2 } from "../../../hooks/fetchEventData2";

const boxItem = [
    {
        heading: "Event Banners & Theme",
        content: "Upload custom banners or modify default banners, from here! ",
        Icon: (
            <StickerIcon
                className="border-blue-800 border rounded-lg p-1.5 font-extralight"
                size={40}
                strokeWidth={1}
                color="darkblue"
            />
        ),
        section: "isBannerSectionOpen",
    },
    {
        heading: "Basic Details & Registrations",
        content: "Define event name, dates, festival and eligibility criteria ",
        Icon: (
            <Menu
                className="border-blue-800 border rounded-lg p-1.5 font-extralight"
                size={40}
                strokeWidth={1}
                color="darkblue"
            />
        ),
        section: "isBasicDetailSectionOpen",
    },
    {
        heading: "Rounds & Timeline",
        content:
            "Specify rounds like Quiz or Hackathon, to represent the flow of the event. ",
        Icon: (
            <Server
                className="border-blue-800 border rounded-lg p-1.5 font-extralight"
                size={40}
                strokeWidth={1}
                color="darkblue"
            />
        ),
        section: "isRoundsTimelineSectionOpen",
    },
    {
        heading: "About The Event",
        content:
            "Mention details like Rules,Eligibilty, Process, Foramt, etc., the more details the better! ",
        Icon: (
            <AlertCircleIcon
                className="border-blue-800 border rounded-lg p-1.5 font-extralight"
                size={40}
                strokeWidth={1}
                color="darkblue"
            />
        ),
        section: "isAboutEventSectionOpen",
    },
    {
        heading: "Prizes",
        content:
            "Specify monetary rewards, certificates, coupons, subscriptions, other prizes as per rank.",
        Icon: (
            <Medal
                className="border-blue-800 border rounded-lg p-1.5 font-extralight"
                size={40}
                strokeWidth={1}
                color="darkblue"
            />
        ),
        section: "isPrizeSectionOpen",
    },
    {
        heading: "Important Dates, Contact & Manuals",
        content:
            "Mention dates like result declaration, etc., contact details and uplaod relecant files and attachments!",
        Icon: (
            <CalendarRangeIcon
                className="border-blue-800 border rounded-lg p-1.5 font-extralight"
                size={40}
                strokeWidth={1}
                color="darkblue"
            />
        ),
        section: "isImportantDateSectionOpen",
    },
];
export const EventFormStepIII = () => {
    const { eventNumber } = useParams();
    const [sectionStatus, setSectionStatus] = useState({
        isBannerSectionOpen: false,
        isBasicDetailSectionOpen: false,
        isAboutEventSectionOpen: false,
        isImportantDateSectionOpen: false,
        isRoundsTimelineSectionOpen: false,
        isPrizeSectionOpen: false,
    });

    document.title = "Create Event Step-III - Eventers";

    const dispatch = useDispatch();
    const ref = useRef(null);
    const navigate = useNavigate();
    function activateEvent() {
        ref.current.continuousStart();
        axios
            .get(`/api/v1/event/create/${eventNumber}/step3/activateEvent`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                dispatch(setMessage("Event created successfully"));
                setTimeout(() => {
                    navigate(`/event/${eventNumber}`);
                    dispatch(setEventData(null));
                }, 2000);
            })
            .catch((error) => {
                dispatch(
                    setError(
                        error.response ? error.response.data : error.message
                    )
                );
                setTimeout(() => {
                    if (error.response.status == 401) {
                        navigate("/login");
                    }
                    if (error.response.status == 404) {
                        navigate("/event/category");
                    }
                }, 2000);
            })
            .finally(() => {
                ref.current.complete();
            });
    }

    const { eventData, setEventData } = FetchEventData2(eventNumber);

    const handleSectionClick = (section) => {
        setSectionStatus((prevStatus) => ({
            ...prevStatus,
            [section]: !prevStatus[section],
        }));
    };

    const [preview, setPreview] = useState(false);
    return (
        <div className="w-full min-h-[85vh] my-auto">
            <div className="px-5 md:w-1/3 left-0 no-scrollbar absolute h-[80vh] overflow-y-auto  py-5 rounded-md">
                <LoadingBar color="rgb(40 130 246)" height={7} ref={ref} />
                <h1 className="text-lg font-semibold mb-3  text-blue-800  px-1">
                    Customise Features
                </h1>
                {boxItem.map((item, index) => (
                    <Box
                        key={index + Math.random()}
                        heading={item.heading}
                        content={item.content}
                        onClick={() => handleSectionClick(item.section)}
                    >
                        {item.Icon}
                    </Box>
                ))}
                <div>
                    {sectionStatus["isBannerSectionOpen"] && (
                        <EditWrapper>
                            <EventBanner
                                onClick={() =>
                                    handleSectionClick("isBannerSectionOpen")
                                }
                                eventData={eventData}
                                setEventData={setEventData}
                            />
                        </EditWrapper>
                    )}
                    {sectionStatus["isBasicDetailSectionOpen"] && (
                        <EditWrapper>
                            <BasicDetails
                                onClick={() =>
                                    handleSectionClick(
                                        "isBasicDetailSectionOpen"
                                    )
                                }
                                eventData={eventData}
                                setEventData={setEventData}
                            />
                        </EditWrapper>
                    )}
                    {sectionStatus["isAboutEventSectionOpen"] && (
                        <EditWrapper>
                            <AboutEvent
                                onClick={() =>
                                    handleSectionClick(
                                        "isAboutEventSectionOpen"
                                    )
                                }
                                eventData={eventData}
                                setEventData={setEventData}
                            />
                        </EditWrapper>
                    )}
                    {sectionStatus["isImportantDateSectionOpen"] && (
                        <EditWrapper>
                            <ImportantDates
                                onClick={() =>
                                    handleSectionClick(
                                        "isImportantDateSectionOpen"
                                    )
                                }
                                setEventData={setEventData}
                                eventData={eventData}
                            />
                        </EditWrapper>
                    )}
                    {sectionStatus["isRoundsTimelineSectionOpen"] && (
                        <EditWrapper>
                            <RoundsTimeline
                                onClick={() =>
                                    handleSectionClick(
                                        "isRoundsTimelineSectionOpen"
                                    )
                                }
                                setEventData={setEventData}
                                eventData={eventData}
                            />
                        </EditWrapper>
                    )}
                    {sectionStatus["isPrizeSectionOpen"] && (
                        <EditWrapper>
                            <Prizes
                                onClick={() =>
                                    handleSectionClick("isPrizeSectionOpen")
                                }
                                setEventData={setEventData}
                                eventData={eventData}
                            />
                        </EditWrapper>
                    )}
                </div>
                <div className="fixed bottom-0 left-0 w-full z-20 bg-gray-200 sm:h-20 h-16">
                    <div className="px-5 sm:px-10 flex justify-between h-full items-center">
                        <button
                            type="button"
                            onClick={() => setPreview((prev) => !prev)}
                            className="bg-blue-900 px-5  sm:px-10 py-2 rounded-lg text-white text-lg font-semibold sm:font-bold md:hidden hover:bg-blue-700"
                        >
                            {preview ? (
                                <p className="flex items-center ">
                                    Edit
                                    <span className="ml-2 ">
                                        <Edit2 size={17} strokeWidth={2} />
                                    </span>
                                </p>
                            ) : (
                                <p className="flex items-center ">
                                    Preview
                                    <span className="ml-2 ">
                                        <Eye size={23} strokeWidth={2} />
                                    </span>
                                </p>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={activateEvent}
                            className="bg-green-600 px-5 ml-auto  sm:px-10 py-2 rounded-lg text-white text-lg font-semibold sm:font-bold hover:bg-green-700"
                        >
                            <p className="flex items-center ">
                                Publish
                                <span className="ml-2 ">
                                    <Newspaper size={20} strokeWidth={2} />
                                </span>
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`md:w-2/3 ${
                    preview || "hidden"
                } md:block absolute no-scrollbar w-full  bg-white right-0 h-[80vh] overflow-auto py-5 `}
            >
                <Event
                    w={"w-full sm:w-5/6"}
                    eventData={eventData}
                    setEventData={setEventData}
                />
            </div>
        </div>
    );
};
