import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: null,
    eventData: null,
    searchBar: "",
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
        },
        logout: (state) => {
            state.userData = null;
        },
        setEventData: (state, action) => {
            state.eventData = action.payload;
        },
        setSearchBar: (state, action) => {
            state.searchBar = action.payload;
        },
    },
});
export default authSlice.reducer;
export const { login, logout, setEventData, setSearchBar } = authSlice.actions;
