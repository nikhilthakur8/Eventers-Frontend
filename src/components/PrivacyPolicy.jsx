import { Dot } from "lucide-react";
import React from "react";

export const PrivacyPolicy = () => {
    window.scrollBy(-20000, -200000);
    return (
        <div className="sm:px-10 px-5 py-10">
            <h1 className="text-3xl font-semibold text-blue-900 border-b-2 border-blue-800 inline-block px-1 pb-1.5">
                Privacy Policy for Eventers
            </h1>
            <p className="my-2">
                At Eventers, we value the privacy of our users and are committed
                to protecting it. This Privacy Policy outlines how we collect,
                use, and safeguard your personal information when you visit our
                website or use our services.
            </p>
            <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-800 inline-block px-1">
                Information We Collect
            </h2>
            <ul className="my-2">
                <li>
                    <Dot className="inline " size={30} />
                    Personal Information: When you register on our website or
                    submit an event, we may collect personal information such as
                    your name, email address, phone number, and other relevant
                    details.
                </li>
                <li>
                    <Dot className="inline " size={30} />
                    Event Information: We collect information about the events
                    you post, including event name, date, location, description,
                    and any other details you provide.
                </li>
                <li>
                    <Dot className="inline " size={30} />
                    Usage Information: We may collect information about how you
                    interact with our website, such as your IP address, browser
                    type, pages visited, and referring URL.
                </li>
            </ul>
            <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-800 inline-block px-1">
                How We Use Your Information
            </h2>
            <ul className="my-2">
                <li>
                    <Dot className="inline " size={30} />
                    To Provide Services: We use the information you provide to
                    offer our event posting services, facilitate communication
                    between event organizers and attendees, and improve user
                    experience.
                </li>
                <li>
                    <Dot className="inline " size={30} />
                    Communication: We may use your contact information to send
                    you updates, newsletters, promotional materials, and other
                    communications related to our services. You can opt-out of
                    receiving these communications at any time.
                </li>
                <li>
                    <Dot className="inline " size={30} />
                    Analytics: We may use collected data for analytics purposes
                    to analyze trends, track user interactions, and improve our
                    services.
                </li>
            </ul>
            <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-800 inline-block px-1">
                Data Security
            </h2>
            <p className="my-2">
                We implement appropriate technical and organizational measures
                to protect your personal information from unauthorized access,
                alteration, disclosure, or destruction. However, no method of
                transmission over the internet or electronic storage is
                completely secure, and we cannot guarantee absolute security.
            </p>
            <h1 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-800 inline-block px-1">
                Third-Party Links
            </h1>
            <p className="my-2">
                Our website may contain links to third-party websites or
                services that are not operated by us. We have no control over
                the content, privacy policies, or practices of these websites
                and are not responsible for their practices. We encourage you to
                review the privacy policies of any third-party sites you visit.
            </p>
            <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-800 inline-block px-1">
                Children's Privacy
            </h2>
            <p className="my-2">
                Our services are not directed to individuals under the age of
                13, and we do not knowingly collect personal information from
                children under 13. If you are a parent or guardian and believe
                that your child has provided us with personal information,
                please contact us, and we will promptly remove such information
                from our records.
            </p>
            <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-800 inline-block px-1">
                Changes to This Privacy Policy
            </h2>
            <p className="my-2">
                We reserve the right to update or change our Privacy Policy at
                any time. Any changes will be posted on this page, and the
                updated Privacy Policy will be effective upon posting. We
                encourage you to review this Privacy Policy periodically for any
                updates.
            </p>
            <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-800 inline-block px-1">
                Contact Us
            </h2>
            <p className="my-2">
                If you have any questions or comments about this Privacy Policy,
                please contact us at{" "}
                <a
                    href="mailto:nikhilthakur@eventers.online"
                    className="text-blue-900 font-semibold underline hover:text-blue-500"
                >
                    Eventer.online
                </a>
                .
            </p>
        </div>
    );
};
