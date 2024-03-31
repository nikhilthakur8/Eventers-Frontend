/* eslint-disable react/display-name */
import { AlertTriangle, X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../features/user";

export const AlertBanner = React.memo(() => {
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();
    const progressRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        let startTime = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(3000 - elapsedTime, 0);
            const progress = (remainingTime /3000) * 100;
            if (progressRef?.current) {
                progressRef.current.style.width = `${progress}%`;
            }
            if (remainingTime === 0) {
                clearInterval(intervalRef.current);
                dispatch(setError(null));
            }
        }, 50);

        return () => clearInterval(intervalRef.current);
    }, [error, dispatch]);

    return (
        error && (
            <div className="fixed w-full left-0 sm:left-auto sm:right-5 top-20 z-40 sm:w-2/5 lg:w-3/12 px-5">
                <div className="rounded-md overflow-hidden relative">
                    <div className="flex items-center justify-between space-x-4 p-4 bg-red-200 ">
                        <div>
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm  font-medium text-red-600">
                                {error}
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                dispatch(setError(null));
                            }}
                        >
                            <X className="h-6 w-6  cursor-pointer text-red-600" />
                        </div>
                    </div>
                    <div
                        ref={progressRef}
                        className={`bg-red-500 h-1  transition-all duration-75 absolute bottom-0 `}
                        style={{ width: "100%" }}
                    ></div>
                </div>
            </div>
        )
    );
});
