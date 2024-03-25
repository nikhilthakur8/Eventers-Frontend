/* eslint-disable react/prop-types */
import React from "react";

export const Button = ({ onClick }) => {
    return (
        <div
            className={`h-20 w-full md:w-3/5 px-10 flex justify-between items-center fixed bottom-0  bg-gray-200`}
        >
            <button
                type="button "
                className="flex border border-black hover:bg-black text-black hover:text-white font-bold py-2 px-7 rounded-lg"
                onClick={onClick}
            >
                Close
            </button>
            <button
                type="submit"
                className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded-lg"
            >
                Save
            </button>
        </div>
    );
};
