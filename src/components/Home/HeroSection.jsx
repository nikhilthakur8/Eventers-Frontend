import laptop from "../../assets/laptop.webp";
import festival from "../../assets/festival.png";
import competitions from "../../assets/competitions.png";
import scholarship from "../../assets/scholarship.png";
import gif from "../../assets/new.gif";
import { Link } from "react-router-dom";
function HeroSection() {
    return (
        <div className="flex justify-center sm:w-5/6 py-10 w-full mx-auto">
            <div className="w-5/12 md:flex flex-col justify-center hidden mr-10">
                <h1 className="lg:text-6xl md:text-5xl my-2 font-bold font-serif text-blue-900">
                    Eventers
                </h1>
                <div className="lg:text-4xl md:text-3xl font-medium text-gray-600">
                    <p>Hackathons, Fest</p>
                    <p>& more Opportunities... </p>
                </div>
                <p className="text-lg mt-5 text-gray-400">
                    Explore opportunities from across the globe to learn,
                    showcase skills, Enjoy Annual fest.
                </p>
            </div>
            <div className="w-10/12  lg:w-5/12 grid grid-cols-2 grid-rows-6  gap-4 font-medium">
                <Link
                    className="row-span-2 overflow-hidden shadow-lg p-3 relative rounded-xl h-28 sm:h-36 hover:-translate-y-1 transition-all  bg-[#c8bbff]"
                    to={`/event/search?type=${encodeURIComponent(
                        "Hackathon & Coding Challenges"
                    )}`}
                >
                    <p>Hackathon</p>
                    <p className="text-xs text-gray-700 leading-3">Showcase</p>
                    <p className="text-sm text-gray-700 relative leading-5">
                        Coding Skill
                    </p>

                    <img
                        src={laptop}
                        className="right-0 bottom-0 w-[45%]  sm:w-20  absolute contrast-75"
                        alt=""
                    />
                </Link>
                <Link
                    className="row-span-3 p-3 overflow-hidden  relative shadow-lg rounded-xl h-full bg-[#9bc9ff]  hover:-translate-y-1 transition-all"
                    to={`/event/search?type=${encodeURIComponent("Quizzes")}`}
                >
                    <p>Quizzes</p>
                    <p className="text-xs text-gray-700 leading-3">Test</p>
                    <p className="text-sm text-gray-700 leading-5">
                        Your Knowledge
                    </p>
                    <img
                        src={
                            "https://d8it4huxumps7.cloudfront.net/uploads/images/65797db9a47da_frame_1000012906.png?d=560x440"
                        }
                        className="w-full h-4/5 absolute  right-0"
                        alt=""
                    />
                </Link>
                <Link
                    className="row-span-2 p-3 shadow-lg  overflow-hidden z-10 relative rounded-xl h-28 sm:h-36 bg-[#ffb1cc]  hover:-translate-y-1 transition-all"
                    to={`/event/search?type=${encodeURIComponent(
                        "Competitions & Challenges"
                    )}`}
                >
                    <p>Competitions</p>
                    <p className="text-xs text-gray-700 leading-3">Showcase</p>
                    <p className="text-sm text-gray-700 leading-5">
                        Your Knowledge
                    </p>

                    <img
                        src={competitions}
                        className="w-3/5 absolute -z-10 scale-x-[-1] -right-3 -bottom-2 -rotate-[53deg]"
                        alt=""
                    />
                </Link>
                <Link
                    className="row-span-3 relative overflow-hidden shadow-lg rounded-xl h-full p-3 bg-[#fec192]  hover:-translate-y-1 transition-all"
                    to={`/event/search?type=${encodeURIComponent("Fest")}`}
                >
                    <p>Annual Fest</p>
                    <p className="text-xs text-gray-700 leading-3">Explore</p>
                    <p className="text-sm text-gray-700 leading-5">The Fest</p>
                    <img
                        src={festival}
                        className="right-0 bottom-0 h-44 absolute"
                        alt=""
                    />
                </Link>
                <Link
                    className="bg-green-200 overflow-hidden relative z-10 shadow-lg p-3 rounded-xl h-h-28 sm:h-36 row-span-2  hover:-translate-y-1 transition-all"
                    to={`/event/search?type=${encodeURIComponent(
                        "Webinars & Workshops"
                    )}`}
                >
                    <p className="text-lg">Webinar</p>
                    <p className="text-xs  text-gray-700 leading-3">Boost</p>
                    <p className="text-sm  text-gray-700 leading-5">
                        Your Education
                    </p>
                    <img
                        src={scholarship}
                        className="-right-7 -bottom-10 contrast-125 -z-10 w-4/5 absolute"
                        alt=""
                    />
                </Link>
            </div>
        </div>
    );
}

export default HeroSection;
