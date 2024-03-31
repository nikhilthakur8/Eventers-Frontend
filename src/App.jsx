// App.js
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { useEffect } from "react";
import { login, setError } from "./features/user";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AlertBanner } from "./components/AlertBanner";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .get("/api/v1/user/profile", { withCredentials: true })
            .then(({ data }) => {
                dispatch(login(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
