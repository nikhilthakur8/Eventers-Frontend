/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";

export const Input = React.forwardRef(
    (
        {
            name = "",
            placeholder = "",
            type = "",
            label = "",
            errors,
            required,
            message,
            className = "",
            ...props
        },
        ref
    ) => {
        return (
            <div className="w-full mt-5">
                <label
                    htmlFor={name}
                    className="text-md font-semibold text-blue-800 bg-white px-1"
                >
                    {label}
                    {required && <p className="ml-2 text-red-600 inline">*</p>}
                </label>

                {!required && (
                    <span className="text-gray-500 text-sm">(Optional)</span>
                )}

                <p className="text-sm text-black mx-1 my-1">{message}</p>

                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    ref={ref}
                    {...props}
                    className={`w-full  placeholder:font-normal font-semibold ${
                        className || "text-blue-800"
                    } placeholder:normal-case rounded-md border border-gray-400 mt-2 px-3 py-2.5 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 `}
                />
                {errors && errors[name] && (
                    <p className="text-red-600 mt-1 text-sm">
                        * {errors?.[name]?.message}
                    </p>
                )}
            </div>
        );
    }
);
