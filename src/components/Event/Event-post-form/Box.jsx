/* eslint-disable react/prop-types */
import { PencilIcon } from "lucide-react";

export const Box = ({ heading, content, onClick, children }) => {
    return (
        <div className="w-full bg-blue-50 rounded-lg py-4 my-3 px-4 hover:border-2 hover:border-blue-500 transition-all duration-300 border-2  border-transparent ">
            <div className="flex items-center  space-x-3">
                {children}
                <h1 className="text-md font-semibold  text-blue-900   ">
                    {heading}
                </h1>
            </div>
            <div className="flex mt-2 justify-between items-center space-x-5">
                <p className="text-sm font-medium text-blue-800 ">{content}</p>
                <button
                    type="button"
                    onClick={onClick}
                    className="border-blue-800 text-blue-800 hover:text-white hover:bg-blue-700  border flex items-center px-3 py-1 mr-2 rounded-3xl space-x-1"
                >
                    <PencilIcon strokeWidth={1.5} size={15} />
                    <p className=" hover:text-white font-medium">Edit</p>
                </button>
            </div>
        </div>
    );
};
