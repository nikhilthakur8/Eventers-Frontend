/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
const Input = React.forwardRef(function Input(
    {
        label = "",
        name = "",
        type = "text",
        watch,
        errors,
        defaultValue,
        ...props
    },
    ref
) {
    const [isFocused, setIsFocused] = useState(false);
    useEffect(() => {
        if (watch) {
            setIsFocused(true);
        }
    }, [watch]);
    return (
        <div className="mt-6 relative w-full">
            <input
                className={`flex  w-full rounded-md border   border-gray-300 bg-transparent px-3 py-2.5 text-md placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${
                    type === "email" && "lowercase"
                }`}
                type={type}
                id={name}
                ref={ref}
                name={name}
                defaultValue={defaultValue}
                {...props}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => !e.target.value && setIsFocused(false)}
            />
            <label
                htmlFor={name}
                className={`text-lg font-medium bg-white rounded-md cursor-text text-gray-500 transition-all   px-1 absolute  left-3 ${
                    ((isFocused || defaultValue) && "text-sm -top-3") || "top-2"
                }`}
            >
                {label}
            </label>
            {errors[name] && (
                <p className="text-red-600 mt-1 text-sm">
                    * {errors[name]?.message}
                </p>
            )}
        </div>
    );
});

export default Input;
