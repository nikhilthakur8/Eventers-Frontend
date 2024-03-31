import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: null,
    message: null,
    error: null,
    ref: null,
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
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setRef: (state, action) => {
            state.ref = action.payload;
        },
        setSearchBar: (state, action) => {
            state.searchBar = action.payload;
        },
    },
});
export default authSlice.reducer;
export const { login, logout, setMessage, setSearchBar, setError, setRef } =
    authSlice.actions;
