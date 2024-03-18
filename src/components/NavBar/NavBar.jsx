import { BellIcon, LucideHome, LucideMenu, LucideSearch } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchBar } from "../../features/user";
import { HostEventSection } from "../Event/HostEventSection";
import { useState } from "react";

function NavBar() {
    const ans = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    function handleChange(e) {
        dispatch(setSearchBar(e.target.value));
    }
    const [isMenuOpen, setMenu] = useState(false);
    return (
        <>
            {isMenuOpen && <HostEventSection setMenu={setMenu} />}
            <div className=" border-b-2 border-gray-300 shadow-md h-16 w-full sticky top-0 bg-white z-[100]">
                <nav className="flex flex-row h-full items-center justify-between">
                    <p className="lg:text-2xl border-2 border-x-blue-700  border-y-black  p-0.5  rounded-tr-lg rounded-bl-lg text-xl ml-5 font-serif text-blue-900 font-bold">
                        Eventers
                    </p>
                    <div className="mx-5 flex flex-grow justify-end items-center  flex-row ">
                        <Link to={"/event/search"}>
                            <div className="hidden md:flex rounded-3xl overflow-hidden mx-4">
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="Search Opportunities"
                                    className="bg-gray-200 focus:outline-none pl-6 placeholder:text-gray-600"
                                    onChange={handleChange}
                                />
                                <label htmlFor="search">
                                    <LucideSearch
                                        className=" bg-gray-200 p-0.5  pr-3 text-blue-600"
                                        size={35}
                                    />
                                </label>
                            </div>
                        </Link>
                        <Link to={"/event/search"}>
                            <LucideSearch
                                className=" rounded-full block md:hidden mr-4 bg-gray-200 active:bg-gray-400 transition-all p-1.5  text-blue-800"
                                size={34}
                            />
                        </Link>
                        <Link to="/">
                            <LucideHome
                                className=" mr-4   text-blue-900"
                                size={22}
                            />
                        </Link>
                        {ans && (
                            <Link
                                to="/profile"
                                className="rounded-full w-8 h-8 overflow-hidden  mr-4"
                            >
                                <img
                                    src={
                                        (ans?.profileImg?.length > 0 &&
                                            ans.profileImg) ||
                                        `https://cdn-icons-png.flaticon.com/512/219/219970.png`
                                    }
                                    alt=""
                                />
                            </Link>
                        )}
                        <LucideMenu
                            className=" rounded-full  text-blue-900 cursor-pointer"
                            size={25}
                            onClick={() => setMenu(true)}
                        />
                    </div>
                </nav>
            </div>
        </>
    );
}

export default NavBar;
