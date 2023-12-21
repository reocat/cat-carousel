import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
};
export const switchSlice = createSlice({
    name: "switch",
    initialState,
    reducers: {
        on: (state) => {
            state.active = true;
        },
        off: (state) => {
            state.active = false;
        },
        toggle: (state) => {
            const current = state.active;
            if (current === true) {
                state.active = false;
            } else {
                state.active = true;
            }
        },
    },
});
export const hellStateReducer = switchSlice.reducer;
export const {on,off,toggle} = switchSlice.actions;