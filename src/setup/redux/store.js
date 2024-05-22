import { configureStore } from "@reduxjs/toolkit";
import { authSlices } from "./authSlices";

export const store = configureStore({
    reducer : {
        auth : authSlices.reducer
    }
})