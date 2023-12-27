import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ManageServiece from "../Manage/ManageServiece.js"

export const getUsers = createAsyncThunk(
    'manage/getuser',
    async (key = '', thunkAPI) => {
        try {
            const users = await ManageServiece.getUsers(key);
            return users;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data?.message)
        }

    }
)

export const deleteUser = createAsyncThunk(
    'manage/deleteUser',
    async (usesrId, thunkAPI) => {
        try {
            let deleteUser = await ManageServiece.deleteUser(usesrId);
            return deleteUser;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const initialState = {
    userList: [],
    isLoading: false,
    error: '',
    isDelete: false
}

const manageSlice = createSlice({
    name: 'manage',
    initialState,
    reducers: {
        reset: (state) => {
            state.error = '';
            state.isDelete = false
        },
        searchUser: (state, action) => {
            state.userList = state.userList.filter((user) => {
                return user.name.includes(action.payload)
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
                state.userList = action.payload.users
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.userList = state.userList.filter((user) => user._id !== action.payload.usesrId);
                state.isLoading = false;
                state.isDelete = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isDelete = false;
                state.error = action.payload
            })
    }
})

export const { reset, searchUser } = manageSlice.actions;
export default manageSlice.reducer;