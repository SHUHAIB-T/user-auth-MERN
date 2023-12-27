import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    key: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search: (state, action) => {
            state.key = action.payload
        }
    }
});

export const { search } = searchSlice.actions;
export default searchSlice.reducer;