import React from "react";
import { Outlet } from "react-router-dom";
import { AlertBanner } from "./components/AlertBanner";
import { SuccessBanner } from "./components/SuccessBanner";

export const Index = () => {
    return (
        <>
            <Outlet />
            <AlertBanner />
			<SuccessBanner/>
        </>
    );
};
