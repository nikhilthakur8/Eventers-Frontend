/* eslint-disable react/prop-types */
import {
    ArrowLeft,
    BookImage,
    CircleUserRound,
    LogIn,
    MessageCirclePlus,
    PartyPopper,
    Search,
    UserRoundPlus,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const mentItems = [
    {
        link: "/event/category",
        text: "Host Now",
        icon: <PartyPopper size={23} className="mr-3" />,
    },
    {
        link: "/my/event",
        text: "My Events",
        icon: <BookImage size={23} className="mr-3" />,
    },
    {
        link: "/profile",
        text: "Profile",
        icon: <CircleUserRound size={23} className="mr-3" />,
    },
    {
        link: "/event/search",
        text: "Search Event",
        icon: <Search size={23} className="mr-3" />,
    },
    {
        link: "/feedback",
        text: "Feedback",
        icon: <MessageCirclePlus size={23} className="mr-3" />,
    },
];
const menuItemsForGuest = [
    {
        link: "/Login",
        text: "Login",
        icon: <LogIn size={23} className="mr-3" />,
    },
    {
        link: "/signup",
        text: "Create Account",
        icon: <UserRoundPlus size={23} className="mr-3" />,
    },
    {
        link: "/event/category",
        text: "Host Now",
        icon: <PartyPopper size={23} className="mr-3" />,
    },
    {
        link: "/event/search",
        text: "Search Event",
        icon: <Search size={23} className="mr-3" />,
    },
    {
        link: "/feedback",
        text: "Feedback",
        icon: <MessageCirclePlus size={23} className="mr-3" />,
    },
];
export const HostEventSection = ({ setMenu }) => {
    const userData = useSelector((state) => state.userData);
    return (
        <div
            className="min-h-screen fixed top-0 z-[200] bg-white w-full sm:w-1/2 right-0 p-5 shadow-lg shadow-black"
            onClick={() => setMenu(false)}
        >
            <ArrowLeft
                size={30}
                onClick={() => setMenu(false)}
                className="cursor-pointer"
            />

            {(userData ? mentItems : menuItemsForGuest).map((item, index) => (
                <Link to={item.link} className="block my-4" key={index}>
                    <div className="font-medium flex justify-center items-center py-3 shadow-md shadow-gray-400 rounded-lg text-lg  bg-blue-800 hover:bg-blue-700 text-white ">
                        {item.icon}
                        {item.text}
                    </div>
                </Link>
            ))}
        </div>
    );
};
