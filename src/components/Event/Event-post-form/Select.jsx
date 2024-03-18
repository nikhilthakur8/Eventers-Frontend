/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
export const Select = React.forwardRef(
    (
        {
            name,
            label,
            selectName,
            options = [],
            defaultValue = "",
            errors,
            watch,
            ...props
        },
        ref
    ) => {
        useEffect(()=>{
            if(watch){
                setSelected(true);
            }
        },[watch]);
        const [selected, setSelected] = useState(false);
        return (
            <div className="mt-5 relative">
                <label
                    htmlFor={name}
                    className="text-md font-semibold text-blue-800 bg-white px-1"
                >
                    {label} <p className="ml-2 text-red-600 inline">*</p>
                </label>
                <select
                    id={name}
                    className={`py-2.5 mt-2  w-full px-3 rounded-lg bg-white border-gray-400 border  focus:outline-none  appearance-none relative z-10 ${
                        selected ? "text-blue-800 font-semibold" : "text-gray-400"
                    }`}
                    name={name}
                    defaultValue={defaultValue}
                    ref={ref}
                    {...props}
                >
                    <option value="" disabled>
                        {selectName}
                    </option>
                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={option}
                            className="absolute text-blue-900 text-lg"
                        >
                            {option}
                        </option>
                    ))}
                </select>
                <div className="absolute top-12 z-10 rotate-180 text-blue-800 right-4 pointer-events-none w-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="rgb(30 64 175)"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </div>
                {errors[name] && (
                    <p className="text-red-600 mt-1 text-sm">
                        * {errors[name]?.message}
                    </p>
                )}
            </div>
        );
    }
);
