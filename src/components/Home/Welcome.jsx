/* eslint-disable react/prop-types */
import Typewriter from "typewriter-effect";

function Welcome({ fullName }) {
    return (
        <div className="mx-8 sm:flex flex-col items-center">
            <div className="lg:text-2xl text-xl flex font-serif font-medium text-blue-900">
                <Typewriter
                    options={{
                        strings: ["Hello,", "नमस्ते,", "Hola,", "Bonjour,"],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 100,
                    }}
                />
            </div>
            <p className="md:text-4xl text-3xl font-bold  text-blue-900">
                {fullName || "Guest User"}....
            </p>
        </div>
    );
}

export default Welcome;
