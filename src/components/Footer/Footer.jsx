import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <div className="bg-blue-900">
            <section className="relative overflow-hidden py-10">
                <div className="relative z-10 mx-auto max-w-7xl px-4">
                    <div className="-m-6 flex flex-wrap justify-between">
                        <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                            <div className="flex h-full flex-col justify-between">
                                <div className="mb-4 inline-flex items-center">
                                    <p className="lg:text-2xl border-4 border-x-white  border-y-blue-400  p-1  rounded-tr-lg rounded-bl-lg text-xl  font-serif text-white font-bold">
                                        Eventers
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-4  text-white font-medium">
                                        The Event Posting Company
                                    </p>
                                    <p className="text-sm text-white ">
                                        &copy; Copyright 2024. All Rights
                                        Reserved by Eventers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-4  text-xs font-semibold uppercase text-white ">
                                    Company
                                </h3>
                                <ul>
                                    <li className="mb-3">
                                        <Link
                                            className=" text-base font-medium text-white hover:text-gray-400"
                                            to="/event/category"
                                        >
                                            Host Event
                                        </Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link
                                            className=" text-base font-medium text-white hover:text-gray-400"
                                            to="/my/event"
                                        >
                                            My Events
                                        </Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link
                                            className=" text-base font-medium text-white hover:text-gray-400"
                                            to="/event/search"
                                        >
                                            Search Event
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className=" text-base font-medium text-white hover:text-gray-400"
                                            to="/Profile"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-4  text-xs font-semibold uppercase text-white  ">
                                    Support
                                </h3>
                                <ul>
                                    <li className="mb-3">
                                        <Link
                                            className=" text-base font-medium text-white hover:text-gray-400"
                                            to="/profile"
                                        >
                                            Account
                                        </Link>
                                    </li>
                                    <li className="mb-3">
                                        <a
                                            className=" text-base font-medium text-white hover:text-gray-400"
                                            href="mailto:nikhilthakur8012004@gmail.com"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                    <li className="mb-3">
                                        <Link
                                            className=" text-base font-medium text-white hover:text-gray-400"
                                            to="/feedback"
                                        >
                                            Feedback
                                        </Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link
                                            className=" text-base font-medium text-white hover:text-gray-400"
                                            to="/privacypolicy"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
