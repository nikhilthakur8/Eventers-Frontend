/* eslint-disable react/prop-types */
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Event } from "./Event";
import {
    Building2,
    CalendarClockIcon,
    CalendarRangeIcon,
    Download,
    DrumIcon,
    ExternalLink,
    MapIcon,
    MapPin,
    MapPinIcon,
    MapPinOffIcon,
    PartyPopper,
} from "lucide-react";
import trophy from "../../assets/trophy.png";
import team from "../../assets/team.png";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const rankToName = {
    1: "Winner",
    2: "First Runner Up",
    3: "Second Runner Up",
    4: "Third Runner Up",
    5: "Fourth Runner Up",
    6: "Fifth Runner Up",
    7: "Sixth Runner Up",
};
export const EventDetails = ({ eventData }) => {
    function setEventDate(date) {
        if (date) {
            const currentDate = new Date();
            const endDate = new Date(date);
            const timeLeft = endDate.getTime() - currentDate.getTime();
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor(timeLeft / (1000 * 60));
            return (
                (days > 0 && days + " days left") ||
                (hours > 0 && hours + " hours left") ||
                (minutes > 0 && minutes + " minutes left") ||
                null
            );
        }
    }
    function IsoToDate(date) {
        const time = new Date(date);
        return time.toDateString();
    }
    function IsoToTime(date) {
        const time = new Date(date);
        return (
            time.toLocaleTimeString().split(":")[0] +
            ":" +
            time.toLocaleTimeString().split(":")[1] +
            " " +
            time.toLocaleTimeString().slice(8) +
            " IST"
        );
    }
    function modifyAboutEvent(data) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");

        const strElements = doc.querySelectorAll("strong");
        const ulElements = doc.querySelectorAll("ul");
        strElements.forEach((str) => {
            str.classList.add("text-lg");
        });

        ulElements.forEach((ul, index) => {
            const liElements = ul.querySelectorAll("li");
            liElements.forEach((li, index) => {
                li.classList.add("ml-4", "my-2", "flex", "items-center");
                li.innerHTML =
                    `<p class="px-2 pb-0.5 mr-2 justify-center h-auto items-center text-sm flex  rounded-full border-2 border-blue-500 bg-blue-100">&#9679;</p>` +
                    li.innerText;
            });
        });

        return doc.body.innerHTML;
    }
    return (
        <div
            className={`w-full md:w-11/12 mx-auto  sm:my-8 rounded-xl sm:overflow-hidden  shadow-lg scroll-smooth bg-white`}
        >
            {/* Event Banner */}
            <div className="">
                {eventData?.eventBanner ? (
                    <img
                        src={eventData?.eventBanner}
                        className="h-72 w-full object-fit"
                    />
                ) : (
                    <div className="h-72 w-full flex text-4xl font-bold justify-center items-center bg-blue-100">
                        <p className="border-b-4 border-dashed border-blue-900 text-gray-800 uppercase py-3 px-5">
                            {eventData?.eventName}
                        </p>
                    </div>
                )}
            </div>

            {/* Event Logo and Event Heading */}
            <Link to={`/event/${eventData?.eventNumber}`} target="_blank">
                <div className="px-5 py-10  hover:bg-blue-50 flex group space-x-4 relative">
                    <img
                        src={eventData?.eventLogo}
                        className="w-20 h-20 rounded-lg "
                    />
                    <div className="text-blue-900">
                        <p className="font-bold uppercase text-xl text-blue-900">
                            {eventData?.eventName}
                        </p>
                        <div className="flex font-semibold items-center space-x-1 mt-1.5 text-sm">
                            <Building2 className="text-blue-900" size={23} />
                            <p>{eventData?.organisationName}</p>
                        </div>
                        {eventData?.stateName && eventData?.cityName && (
                            <div className="flex items-center font-semibold space-x-1 mt-1.5 text-sm">
                                <MapPin className="text-blue-900" size={20} />
                                <p>{eventData?.stateName},</p>
                                <p>{eventData?.cityName}</p>
                            </div>
                        )}
                    </div>
                    {!setEventDate(eventData?.endDate) && (
                        <p className="absolute top-0 right-0 px-3 py-1 text-white font-medium rounded-bl-lg bg-red-500">
                            Expired
                        </p>
                    )}
                    <div>
                        <ExternalLink className="text-blue-900 group-hov  absolute top-1/2 -mt-4 right-5 " />
                    </div>
                </div>
            </Link>

            <div className="h-0.5 bg-gray-200"></div>
            {/* Event Reg Deadline and Team Size */}
            <div className="flex flex-wrap items-center px-5 pb-10 pt-6">
                <div className="flex font-medium text-blue-900 mr-5 mt-4">
                    <div className="bg-blue-200 inline-block p-3 h-fit rounded-lg mr-2">
                        <CalendarRangeIcon />
                    </div>
                    <div>
                        <h1>Registration Deadline</h1>
                        <p>
                            {setEventDate(eventData?.endDate) || (
                                <span className="text-red-600">Expired</span>
                            )}
                        </p>
                    </div>
                </div>
                {eventData?.participationType == "team" ? (
                    <div className="flex font-medium text-blue-900 mt-4 mr-5 ">
                        <div className="bg-blue-200 inline-block p-3 rounded-lg mr-2">
                            <img className="w-6 mx-auto" src={team} />
                        </div>
                        <div>
                            <h1>Team Size</h1>
                            <p className="inline">{eventData?.minTeam} - </p>
                            <p className="inline">{eventData?.maxTeam}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex font-medium text-blue-900 mt-4 mr-5 ">
                        <div className="bg-blue-200 inline-block p-3  rounded-lg mr-2">
                            <img
                                className="w-6 mx-auto"
                                src={
                                    "https://img.icons8.com/material-sharp/24/conference-call.png"
                                }
                            />
                        </div>
                        <div>
                            <h1>Participation Type</h1>
                            <p className="">Individual</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="h-0.5 bg-gray-200"></div>

            <div className="px-5 py-2 flex-wrap text-blue-900 text-sm font-medium flex">
                <div className="flex bg-blue-100 p-2 rounded-full my-2 mr-3">
                    {eventData?.modeOfEvent == "Offline" ? (
                        <>
                            <MapPinOffIcon size={20} className="mr-1.5" />
                            <p>Offline</p>
                        </>
                    ) : (
                        <>
                            <MapPinIcon size={20} className="mr-1.5" />
                            <p>Online</p>
                        </>
                    )}
                </div>
                <div className="p-2 flex bg-blue-100 rounded-full my-2 mr-3">
                    <DrumIcon size={20} className="mr-1.5" />
                    {eventData?.eventType}
                </div>
                {eventData?.stateName && (
                    <div className="p-2 flex bg-blue-100 rounded-full my-2 mr-3">
                        <MapIcon size={20} className="mr-1.5" />
                        {eventData?.stateName}
                    </div>
                )}
                {eventData?.festivalName && (
                    <div className="p-2 flex bg-blue-100 rounded-full my-2 mr-3">
                        <PartyPopper size={20} className="mr-1.5" />
                        {eventData?.festivalName}
                    </div>
                )}
            </div>

            <div className="h-0.5  bg-gray-200"></div>
            <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar py-4 px-5 text-blue-900 font-medium ">
                {eventData?.endDate && (
                    <a href="#registrationDeadline" className="mr-4">
                        Registration Deadline
                    </a>
                )}
                {eventData?.importantDates && (
                    <a href="#importantDates" className="mr-4">
                        Important Dates
                    </a>
                )}
                {eventData?.rounds?.length > 0 && (
                    <a href="#rounds" className="mr-4">
                        Rounds
                    </a>
                )}
                {eventData?.aboutEvent && (
                    <a href="#aboutEvent" className="mr-4">
                        About Event
                    </a>
                )}
                {eventData?.website && (
                    <a href="#website" className="mr-4">
                        Website
                    </a>
                )}
                {eventData?.prizes && eventData?.prizes.length > 0 && (
                    <a href="#prizes" className="mr-4">
                        Prizes
                    </a>
                )}

                {eventData?.eventBrochure && (
                    <a href="#brochure" className="mr-4">
                        Brochure
                    </a>
                )}
                {eventData?.contactDetails?.length > 0 && (
                    <a href="#contact">Contact</a>
                )}
            </div>

            <div className="h-0.5 bg-gray-200"></div>
            <div className="px-5 py-10" id="registrationDeadline">
                <h1 className="font-bold text-xl text-blue-900">
                    Registration Deadline
                </h1>
                <div className="flex flex-wrap">
                    <div className=" mt-4 flex text-blue-900 font-medium mr-5 ">
                        <div className="bg-blue-200 inline-block p-3 h-fit rounded-lg mr-2">
                            <CalendarRangeIcon />
                        </div>
                        <div>
                            <h1>Registration Start Date</h1>
                            <p>
                                {IsoToDate(eventData?.startDate).slice(4)}
                                {", "}
                                {IsoToTime(eventData?.startDate)}
                            </p>
                        </div>
                    </div>
                    <div className=" mt-4 flex text-blue-900 font-semibold ">
                        <div className="bg-blue-200  inline-block p-3 h-fit rounded-lg mr-2">
                            <CalendarRangeIcon />
                        </div>
                        <div>
                            <h1>Registration End Date</h1>
                            <p>
                                {IsoToDate(eventData?.endDate).slice(4)}
                                {", "}
                                {IsoToTime(eventData?.endDate)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Important Dates */}
            <div className="h-0.5 bg-gray-200"></div>
            {eventData && eventData?.importantDates?.length > 0 && (
                <div className="px-5 py-10 " id="importantDates">
                    <h1 className="text-xl font-bold text-blue-900 ">
                        Important Dates
                    </h1>
                    <div className="flex flex-wrap">
                        {eventData?.importantDates.map((impDate, index) => (
                            <div
                                className="mt-4 font-medium px-5 text-blue-900 flex items-center space-x-2"
                                key={index}
                            >
                                <CalendarClockIcon
                                    size={29}
                                    strokeWidth={1.5}
                                />
                                <div>
                                    <p className="text-blue-900/80 text-sm">
                                        {impDate.dateTitle}
                                    </p>
                                    <p className="text-sm text-blue-900/80">
                                        {IsoToDate(impDate.date).slice(4)}
                                        {", "}
                                        {IsoToTime(impDate.date)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="h-0.5 bg-gray-200"></div>

            {/* Rounds */}
            {eventData && eventData?.rounds?.length > 0 && (
                <div className="px-5  py-10" id="rounds">
                    <h1 className="text-xl font-bold text-blue-900">Rounds</h1>
                    {eventData?.rounds.map((round, index) => (
                        <div
                            className="mt-4 bg-blue-100 border-blue-600 border-b-2 p-5 rounded-lg text-blue-900 shadow-md relative overflow-hidden"
                            key={index}
                        >
                            <p>
                                <strong>Title : </strong>
                                {round.title}
                            </p>
                            <p>
                                <strong>Timing : </strong>
                                {IsoToDate(round.startDate).slice(4)}
                                {", "}
                                {IsoToTime(round.startDate)}
                                {" - "}
                                {IsoToDate(round.endDate).slice(4)}
                                {", "}
                                {IsoToTime(round.endDate)}
                            </p>
                            <p>
                                <strong>Description : </strong>
                                {round.description}
                            </p>
                            {round.isEliminatorRound == "true" && (
                                <p className="bg-red-600 rounded-bl-lg  text-white inline-block px-2 py-1 absolute top-0 right-0 sm:text-sm text-xs">
                                    Eliminator round
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className="h-0.5 bg-gray-200"></div>

            {/* Guildlines */}
            <div className="text-blue-900 px-5 py-10" id="aboutEvent">
                <h1 className="text-xl font-bold mb-4">About Event</h1>
                <div
                    className="ml-5 "
                    dangerouslySetInnerHTML={{
                        __html: modifyAboutEvent(eventData?.aboutEvent),
                    }}
                />
            </div>
            <div className="h-0.5 bg-gray-200"></div>

            {/* Event Website */}
            {eventData && eventData.eventWebsite && (
                <div className="px-5 py-10" id="website">
                    <h1 className="text-xl font-bold text-blue-900">Website</h1>
                    <p className="text-xs text-blue-900">
                        (For more details & Registraion please visit website)
                    </p>
                    <a
                        href={eventData?.eventWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:border-blue-400 border-b-2  border-blue-700 hover:text-blue-900 inline-block mt-2 font-semibold bg-blue-200 hover:bg-blue-100 rounded-full py-2 px-5"
                    >
                        {eventData?.eventWebsite}
                        <ExternalLink
                            strokeWidth={1.3}
                            size={19}
                            className="inline-block ml-2 mb-1"
                        />
                    </a>
                </div>
            )}

            {/* Prizes */}
            <div className="h-0.5 bg-gray-300"></div>
            {eventData && eventData?.prizes?.length > 0 && (
                <div className="px-5 py-10" id="prizes">
                    <h1 className="text-xl font-bold text-blue-900">Prizes</h1>
                    <div className="grid  grid-cols-1 sm:grid-cols-2 gap-5 my-10">
                        {eventData?.prizes.map((prize, index) => (
                            <div
                                className="bg-blue-100 shadow-blue-900 shadow-sm w-full flex px-4 py-5 rounded-lg items-center"
                                key={index}
                            >
                                <img
                                    src={trophy}
                                    className="w-16 object-fill"
                                />
                                <div className="text-blue-900 font-semibold text-lg ml-4 space-y-2">
                                    <p className="text-xl">
                                        {rankToName[prize.rank]}
                                    </p>
                                    <p>&#8377; {prize.cashAmount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="h-0.5 bg-gray-300"></div>
            {/* Event Brochure*/}
            {eventData && eventData.eventBrochure && (
                <div className="px-5 py-8" id="brochure">
                    <h1 className="text-xl font-bold text-blue-900">
                        Event Brochure
                    </h1>
                    <p className="font-medium shadow-gray-300 shadow-md bg-blue-100 px-3 mr-5 py-1.5 my-3 inline-block rounded-md text-blue-900">
                        Brochure: {eventData?.eventBrochureTitle}
                    </p>
                    <button className="mt-4 shadow-lg shadow-blue-900">
                        <a
                            href={eventData?.eventBrochure}
                            target="_blank"
                            className="shadow-xl bg-blue-900 hover:bg-blue-700 font-semibold text-white px-3 py-2.5 rounded-lg"
                            rel="noreferrer"
                        >
                            <Download className="inline mr-2 mb-1" size={20} />
                            Download Brochure
                        </a>
                    </button>
                </div>
            )}

            <div className="h-0.5 bg-gray-200"></div>
            {/* Contact Organisers */}
            {eventData && eventData?.contactDetails?.length > 0 && (
                <div className="px-5 py-10" id="contact">
                    <h1 className="text-xl mb-3 font-bold text-blue-900">
                        Contact Organisers
                    </h1>
                    <div className="flex flex-wrap">
                        {eventData?.contactDetails.map((contact, index) => (
                            <div
                                key={index}
                                className="flex mt-4 mr-5 font-medium text-blue-800"
                            >
                                <div className="uppercase mr-4 text-blue-900 bg-blue-200 inline-block rounded-lg font-bold text-lg p-2 h-fit">
                                    {contact.name.slice(0, 2)}
                                </div>
                                <div>
                                    <p>{contact.name}</p>
                                    <p>
                                        +91
                                        <a
                                            href={`tel:${contact.number}`}
                                            className="ml-1"
                                        >
                                            {contact.number}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
