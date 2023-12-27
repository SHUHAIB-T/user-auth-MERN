import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feautures/Auth/AuthSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});