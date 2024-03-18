import { useEffect } from "react";
import { EventInput } from "./EventInput";

const eventCategories = [
    {
        name: "Hackathon & Coding Challenges",
        type: "Create Hackathon",
        imgSrc: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-html-copywriting-flaticons-lineal-color-flat-icons.png",
        bgColor: "bg-pink-100",
    },
    {
        name: "Fest",
        type: "Create Fest",
        imgSrc: "https://img.icons8.com/keek/100/experimental-festival-keek.png",
        bgColor: "bg-yellow-100",
    },
    {
        name: "Cultural Event",
        type: "Create Cultural Events",
        imgSrc: "https://img.icons8.com/fluency/48/confetti--v1.png",
        bgColor: "bg-purple-100",
    },
    {
        name: "Quizzes",
        type: "Create Quizzes",
        imgSrc: "https://img.icons8.com/cute-clipart/64/test-passed.png",
        bgColor: "bg-green-100",
    },
    {
        name: "Competitions & Challenges",
        type: "Create Competition",
        imgSrc: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-codeforces-programming-competitions-and-contests-programming-community-logo-shadow-tal-revivo.png",
        bgColor: "bg-violet-100",
    },
    {
        name: "Webinars & Workshops",
        type: "Create Workshops",
        imgSrc: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-webinar-online-education-flaticons-lineal-color-flat-icons-2.png",
        bgColor: "bg-blue-100",
    },
    // {
    //     name: "Scholarships",
    //     type: "Create Scholarships",
    //     imgSrc: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-scholarship-online-education-flaticons-lineal-color-flat-icons-4.png",
    //     bgColor: "bg-cyan-100",
    // },
];

export default function EventCategory() {
    document.title = "Event Category - Eventers";
    useEffect(() => {
        window.scrollBy(-99999, -99999);
    }, []);
    return (
        <div className="min-h-screen">
            <div className="flex p-5 md:py-10 w-full md:items-center flex-col bg-gradient-to-r from-blue-200 to-yellow-100">
                <h1 className="font-semibold text-3xl font-serif mb-2 ">
                    Host Your Event
                </h1>
                <p className="text-gray-500">
                    Select your Event Category From Below
                </p>
            </div>
            <div className="my-5 mx-3 rounded-lg  flex flex-col sm:items-center md:mx-auto md:w-11/12 p-4 bg-blue-100">
                <p className="font-serif text-3xl font-semibold mb-3">
                    Create Event
                </p>
                <div className="sm:grid sm:grid-cols-2 xl:grid-cols-3 xl:gap-8 gap-5">
                    {eventCategories.map((event, index) => (
                        <EventInput
                            key={index}
                            eventCategoryName={event.name}
                            eventType={event.type}
                            imgSrc={event.imgSrc}
                            bgColor={event.bgColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
