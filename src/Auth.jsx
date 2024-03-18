import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import axios from "axios";
import { login } from "./features/user";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAuthenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        axios
            .get("/api/v1/user/profile", { withCredentials: true })
            .then(({ data }) => {
                dispatch(login(data));
                setAuthenticated(true);
            })
            .catch(() => {
                navigate("/login");
            });
    }, []);
    return (
        isAuthenticated && (
            <>
                <NavBar />
                <Outlet />
                <Footer />
            </>
        )
    );
}

export default Auth;
