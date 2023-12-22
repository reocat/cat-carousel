import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    active: false,
};
const initialNear = false;
const initialSelectedApi = 'catapi';
const initialColorState = 'ffdead';

export const nearStateSlice = createSlice({
    name: 'near', initialState: initialNear, reducers: {
        near: state => state = true, notNear: state => state = false, toggleNear: state => state = !state
    }
})
export const switchSlice = createSlice({
    name: "switch", initialState, reducers: {
        on: (state) => {
            state.active = true;
        }, off: (state) => {
            state.active = false;
        }, toggle: (state) => {
            const current = state.active;
            state.active = current !== true;
        },
    },
});
export const apiSlice = createSlice({
    name: 'selectedApi',
    initialState: initialSelectedApi,
    reducers: {
        selectApi: (state,payload)=>state=payload.payload
    }
});
export const colorSlice = createSlice({
    name:"color",
    initialState:initialColorState,
    reducers:{
        setColor:(state,payload)=>state = payload.payload
    }
})


export const hellStateReducer = switchSlice.reducer;
export const nearStateReducer = nearStateSlice.reducer
export const selectedApiReducer = apiSlice.reducer;
export const selectedColorReducer = colorSlice.reducer;


export const {on, off, toggle} = switchSlice.actions;
export const {near, notNear, toggleNear} = nearStateSlice.actions;
export const {selectApi} = apiSlice.actions;
export const {setColor} = colorSlice.actions;
