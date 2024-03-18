/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { CheckCircle, X } from "lucide-react";
import { useEffect } from "react";

export function SuccessBanner({ message, setMessage }) {
    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }, [message, setMessage]);

    return (
        message &&
        message.length > 0 && (
            <div className=" fixed w-full left-0 sm:left-auto sm:right-0 top-20 z-40 sm:w-2/5 lg:w-3/12 px-5">
                <div className="rounded-md border-l-4 border-green-600 overflow-hidden bg-green-100 p-4">
                    <div className="flex items-center justify-between space-x-4">
                        <div>
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-600">
                                {message}
                            </p>
                        </div>
                        <div onClick={() => setMessage(null)}>
                            <X className="h-6 w-6 cursor-pointer text-green-600" />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
