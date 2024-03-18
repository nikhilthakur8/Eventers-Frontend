import { Link } from "react-router-dom";
import promotion from "../../assets/promotion.png";
import { ArrowUpRight } from "lucide-react";
function HostEvent() {
    return (
        <div className="bg-blue-100">
            <div className="sm:px-6 mt-5 py-10 relative mx-auto w-5/6  sm:w-4/5 lg:w-4/5">
                <h1 className=" text-2xl font-bold">
                    Host Your Exclusive event with
                </h1>
                <h1 className="text-2xl md:text-3xl font-bold text-blue-900 border-4 inline-block p-1 border-y-gray-400 border-x-blue-600 rounded-tr-xl my-2 rounded-bl-xl">
                    Eventers
                </h1>
                <div className="text-sm leading-4 mt-3 ">
                    <p>Showcase Your Event With</p>
                    <p>Fellow Students and Attract Sponsors.</p>
                </div>
                <Link to="/event/category" className="inline-block">
                    <button className="bg-blue-700 px-4 py-2 mt-4 flex items-center  text-white rounded-3xl">
                        Host Now
                        <ArrowUpRight
                            size={30}
                            className="inline ml-2 bg-blue-900 rounded-full p-1"
                        />
                    </button>
                </Link>
                {/* <Link
                    to="/"
                    className="text-blue-600 font-semibold mx-4 underline text-sm"
                >
                    Know More
                </Link> */}
                <img
                    src={promotion}
                    className="absolute w-2/5  lg:w-[24%] 	 contrast-125 bottom-0 sm:right-0 right-20 scale-x-[-1] hidden sm:block"
                    alt=""
                />
            </div>
        </div>
    );
}

export default HostEvent;
