import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Auth from "./Auth.jsx";
import "./index.css";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { Signup, ForgotPasswordPage, Login } from "./components/service.js";
import Home from "./components/Home/Home.jsx";
import { Profile } from "./components/Profile/Profile.jsx";
import EventCategory from "./components/Event/EventCategory.jsx";
import { EventFormStepII } from "./components/Event/Event-post-form/EventFormStepII.jsx";
import { EventFormStepI } from "./components/Event/Event-post-form/EventFormStepI.jsx";
import { Provider } from "react-redux";
import { store } from "./features/store.js";
import { EventFormStepIII } from "./components/Event/Event-post-form/EventFormStepIII.jsx";
import { Event } from "./components/Event/Event.jsx";
import { EventSearch } from "./components/Event/EventSearch.jsx";
import { MyEvent } from "./components/Event/MyEvent.jsx";
import { VerifyEmail } from "./components/VerifyEmail.jsx";
import { Feedback } from "./components/Feedback.jsx";
import { GoogleLogin } from "./components/GoogleLogin.jsx";
import { PrivacyPolicy } from "./components/PrivacyPolicy.jsx";
import { ForgotPasswordEmail } from "./components/Login/ForgotPasswordEmail.jsx";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="event/:eventNumber" element={<Event />} />
                <Route path="event/search" element={<EventSearch />} />
                <Route path="event/category" element={<EventCategory />} />
                <Route path="/:id/verify/:token" element={<VerifyEmail />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            </Route>
            <Route path="/" element={<Auth />}>
                <Route path="/event">
                    <Route
                        path="create/:eventNumber/step1"
                        element={<EventFormStepI />}
                    />
                    <Route
                        path="create/:eventNumber/step2"
                        element={<EventFormStepII />}
                    />
                    <Route
                        path="create/:eventNumber/step3"
                        element={<EventFormStepIII />}
                    />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="my/event/" element={<MyEvent />} />
                <Route path="/feedback" element={<Feedback />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/login-with-google" element={<GoogleLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/:id/reset-password/:token"
                element={<ForgotPasswordPage />}
            />
            <Route path="/forgot-password" element={<ForgotPasswordEmail />} />
        </Route>
    )
);
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>
);
