/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { CheckCircle, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../features/user";
import { useEffect, useRef, useState } from "react";

export function SuccessBanner() {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message);
    const progressRef = useRef(null);
    const intervalRef = useRef(null);
    useEffect(() => {
        let startTime = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(3000 - elapsedTime, 0);
            const progress = (remainingTime / 3000) * 100;
            if (progressRef.current) {
                progressRef.current.style.width = `${progress}%`;
            }
            if (remainingTime === 0) {
                clearInterval(intervalRef.current);
                dispatch(setMessage(null));
            }
        }, 50);

        return () => clearInterval(intervalRef.current);
    }, [message, dispatch]);
    return (
        message && (
            <div className=" fixed w-full left-0 sm:left-auto sm:right-0 top-20 z-40 sm:w-2/5 lg:w-3/12 px-5">
                <div className="rounded-md  overflow-hidden relative">
                    <div className="flex items-center justify-between space-x-4 p-4 bg-green-100">
                        <div>
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-600">
                                {message}
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                dispatch(setMessage(null));
                            }}
                        >
                            <X className="h-6 w-6 cursor-pointer text-green-600" />
                        </div>
                    </div>
                    <div
                        className={`bg-green-600 h-1  transition-all duration-75 absolute bottom-0 `}
                        ref={progressRef}
                        style={{
                            width: `100%`,
                        }}
                    ></div>
                </div>
            </div>
        )
    );
}
