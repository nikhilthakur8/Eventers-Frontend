/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../features/user";
import { AlertBanner } from "./AlertBanner";

export const GoogleLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [axiosError, setAxiosError] = useState();
    useEffect(() => {
        if (location.search.length > 0) {
            axios
                .get(`/api/v1/user/oauth/session/google${location.search}`)
                .then(({ data }) => {
                    dispatch(login(data));
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                    setAxiosError(
                        err.response ? err.response.data : err.message
                    );
                    setTimeout(() => {
                        navigate("/login");
                    }, 2500);
                });
        } else {
            navigate("/login");
        }
    }, []);
    return (
        <div className="text-xl text-center my-10  text-blue-800">
            <AlertBanner message={axiosError} setError={setAxiosError} />{" "}
            Redirecting to Home Page ...
        </div>
    );
};
