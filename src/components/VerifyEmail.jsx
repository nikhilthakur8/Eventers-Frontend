import axios from "axios";
import { AlertCircle, CheckCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export const VerifyEmail = () => {
    const { id, token } = useParams();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const loadingBar = useRef(null);
    useEffect(() => {
        loadingBar.current.continuousStart();
        axios
            .get("/api/v1/user/" + id + "/verify/" + token)
            .then(({ data }) => {
                setMessage(data);
            })
            .catch((error) => {
                setError(error.response ? error.response.data : error.message);
            })
            .finally(() => {
                loadingBar.current.complete();
            });
    }, [id, token]);
    return (
        <div className="min-h-[80vh] flex items-center justify-center text-2xl sm:text-4xl font-semibold">
            <LoadingBar color="rgb(59 130 246)" height={7} ref={loadingBar} />
            {message ? (
                <div className="flex space-x-4 items-center text-green-700 ">
                    <CheckCircle size={30} strokeWidth={3} />
                    <p className="text-center">{message}</p>
                </div>
            ) : (
                error && (
                    <div className="flex space-x-4 items-center text-red-600">
                        <AlertCircle size={30} strokeWidth={3} />
                        <p className="text-center">{error}</p>
                    </div>
                )
            )}
        </div>
    );
};
