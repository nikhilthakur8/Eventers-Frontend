/* eslint-disable react/prop-types */
import React from "react";

export const EditWrapper = ({ children, w  }) => {
    return (
        <div className="fixed no-scrollbar top-0 z-30 right-0 bg-black/40 w-full h-full overflow-auto">
            <div className={`md:w-3/5 ml-auto bg-white min-h-screen mb-20 `}>
                {children}
            </div>
        </div>
    );
};
