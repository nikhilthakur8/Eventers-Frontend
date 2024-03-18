/* eslint-disable react/prop-types */
import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";
export const AlertBanner = ({ message, setError }) => {
    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 5000);
    }, [message, setError]);

    return (
        message &&
        message.length > 0 && (
            <div className=" fixed w-full left-0 sm:left-auto sm:right-0 top-10 z-40 sm:w-2/5 lg:w-3/12 px-5">
                <div className="rounded-md border-l-4 border-red-600 overflow-hidden bg-red-200 p-4 ">
                    <div className="flex items-center justify-between space-x-4">
                        <div>
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm  font-medium text-red-600">
                                {message}
                            </p>
                        </div>
                        <div onClick={() => setError(null)}>
                            <X className="h-6 w-6  cursor-pointer text-red-600" />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
