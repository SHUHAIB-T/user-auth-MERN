import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthServiece";
import Cookies from 'universal-cookie';
const cookies = new Cookies()

const initialState = {
    user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    role: localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : '',
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: {}
}

export const login = createAsyncThunk(
    "auth/login",
    async (cridentials, thunkAPI) => {
        try {
            const data = await authService.login(cridentials);

            return data;
        } catch (error) {
            const payload = {
                status: error.response.data?.status,
                message: error.response.data?.message
            }
            return thunkAPI.rejectWithValue(payload);
        }
    }
);


export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (form, thunkAPI) => {
        try {
            const profile = await authService.updateProfile(form)
            return profile
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data?.message)
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userInfo");
            localStorage.removeItem("role");
            cookies.remove("accessToken");
            state.user = null;
            state.role = '';
        },
        reset: (state) => {
            state.isLoading = false,
                state.isError = false,
                state.isSuccess = false,
                state.error = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.role = action.payload.role;
                state.isSuccess = true;
                cookies.set("accessToken", action.payload.token, { sameSite: 'None', secure: true })
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.isSuccess = false;
                state.error = action.payload
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user.profile = { filename: action.payload.filename }
                localStorage.setItem('userInfo', JSON.stringify(state.user));
            })
    }
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer