export const Feedback = () => {
    document.title = "Feedback - Eventers";
    return (
        <div className="mx-auto w-full ">
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeytNNl3CQOZ9XbR2iHMmNrnOsaw8MTTA8XiTqgXVJfgMz-NA/viewform?embedded=true"
                className="min-h-[80vh] sm:w-1/2 w-full mx-auto my-10 hide-scrollbar  "
            >
                Loading…
            </iframe>
        </div>
    );
};
