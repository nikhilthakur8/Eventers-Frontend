import { configureStore } from "@reduxjs/toolkit";

import reducer from "./user.js";
export const store = configureStore({ reducer: reducer });
