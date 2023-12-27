import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feautures/Auth/AuthSlice";
import Managereducer from "../feautures/Manage/ManageSlice";
import searchReducer from "../feautures/Manage/searchSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        manage: Managereducer,
        search: searchReducer
    }
});