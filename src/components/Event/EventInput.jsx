/* eslint-disable react/prop-types */
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export const EventInput = ({
    eventCategoryName,
    eventType,
    imgSrc,
    bgColor,
}) => {
    function randomId() {
        const date = Date.now();
        return date.toString().slice(7, 12);
    }

    return (
        <Link
            to={`/event/create/${randomId()}/step1?type=${encodeURIComponent(
                eventCategoryName
            )}`}
        >
            <div className="my-3 flex w-full bg-white rounded-xl p-5 transition-transform duration-300  hover:scale-105 ">
                <img
                    className={`w-20 ${bgColor} p-4 mr-5 rounded-md`}
                    src={imgSrc}
                    alt="Event"
                />
                <div>
                    <h1 className="text-lg font-medium">{eventCategoryName}</h1>
                    <p className="text-blue-500">
                        {eventType} <ArrowRight size={15} className="inline" />
                    </p>
                </div>
            </div>
        </Link>
    );
};
