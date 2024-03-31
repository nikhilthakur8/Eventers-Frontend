import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import HostEventBanner from "./HostEventBanner";
import Welcome from "./Welcome";
import { useSelector } from "react-redux";
import SlideImage from "./SlideImage";
import axios from "axios";
function Home() {
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
        </div>
    );
}
export default Home;
