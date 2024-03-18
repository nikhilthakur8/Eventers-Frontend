function getGoogleUrl() {
    const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        client_id: import.meta.env.VITE_CLIENT_ID,
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
        response_type: "code",
        access_type: "offline",
        prompt: "consent",
    };
    const qs = new URLSearchParams(options);
    return `${rootURL}?${qs.toString()}`;
}

export default getGoogleUrl;
