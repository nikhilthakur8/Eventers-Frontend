import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import HostEventBanner from "./HostEventBanner";
import Welcome from "./Welcome";
import { useSelector } from "react-redux";
import SlideImage from "./SlideImage";
import axios from "axios";
function Home() {
    // const [allEvent, setAllEvent] = useState(null);
    // useEffect(() => {
    //     // requesting all events from server
    //     axios
    //         .get("/api/v1/event/get-all", { withCredentials: true })
    //         .then(({ data }) => {
    //             setAllEvent(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // },[]);
    const userData = useSelector((state) => state.userData);
    document.title = "Home - Eventers";
    return (
        <div className="mt-6">
            <Welcome
                fullName={
                    userData
                        ? userData.firstName + " " + (userData?.lastName || " ")
                        : null
                }
            />
            <HeroSection />
            <HostEventBanner />
            {/* <SlideImage images={allEvent} /> */}
        </div>
    );
}
export default Home;
