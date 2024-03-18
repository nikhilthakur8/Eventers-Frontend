/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Event } from "./Event";
import {
    Building2,
    Clock,
    Clock1,
    Laptop,
    LucideMedal,
    LucideWatch,
    MapPin,
    Watch,
    WatchIcon,
} from "lucide-react";
export const EventCard = ({ eventData }) => {
    function setEventDate(date) {
        if (date) {
            const currentDate = new Date();
            const endDate = new Date(date);
            const timeLeft = endDate.getTime() - currentDate.getTime();
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor(timeLeft / (1000 * 60));
            return (
                (days > 0 && days + " days") ||
                (hours > 0 && hours + " hours") ||
                (minutes > 0 && minutes + " minutes") ||
                null
            );
        }
    }
    return (
        <div className="p-4 " key={Math.random()}>
            <div className="flex items-center  space-x-4 ">
                <img
                    src={eventData?.eventLogo}
                    className=" w-16 h-16 rounded-lg"
                />
                <div className="text-blue-900">
                    <p className="font-bold uppercase text-start  text-blue-900">
                        {eventData?.eventName}
                    </p>
                    <p className="text-xs font-medium text-start">
                        {eventData?.organisationName}
                    </p>
                </div>
            </div>
            <div className="mt-2 flex flex-wrap  justify-around items-center font-medium text-blue-950 text-sm">
                {eventData?.prizes.length > 0 && (
                    <>
                        <div className="flex items-center space-x-1 mt-2">
                            <LucideMedal className="text-gray-600" size={17} />
                            <p>&#x20B9;{eventData?.prizes[0]?.cashAmount}</p>
                        </div>
                        <p className="text-gray-400 font-thin text-2xl">|</p>
                    </>
                )}
                <div className="flex items-center space-x-1 mt-2">
                    <Laptop className="text-gray-600" size={17} />
                    <p>{eventData?.eventType.split(" ")[0]}</p>
                </div>
                <p className="text-gray-400 font-thin text-2xl">|</p>
                <div className="flex items-center space-x-2 mt-2">
                    <Clock className="text-gray-600" size={17} />
                    <p>
                        {setEventDate(eventData?.endDate) || (
                            <span className="text-red-500">Expired</span>
                        )}
                    </p>
                </div>
            </div>
            {!setEventDate(eventData?.endDate) && (
                <span className="absolute text-sm bg-red-400 text-white px-2  py-0.5 top-0 right-0 rounded-tr-lg rounded-bl-lg">
                    Expired
                </span>
            )}
        </div>
    );
};
