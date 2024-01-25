import {createSlice} from "@reduxjs/toolkit";
import { state } from "../types";
type InitialLoginState = {
  logged:boolean,
  uid:string|null
}
const initialState = {
  active: false,
};
const initialNear:boolean = false;
const initialSelectedApi:string = "catapi";
const initialColorState:string = "ffdead";
const initialLoginState:InitialLoginState = {
  logged: false,
  uid: null
}


export const nearStateSlice = createSlice({
  name: "near",
  initialState: initialNear,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    near: (state:boolean) => (state = true),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    notNear: (state:boolean) => (state = false),
    toggleNear: (state:boolean) => (state = !state),
  },
});
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
      state.active = current !== true;
    },
  },
});
export const apiSlice = createSlice({
  name: "selectedApi",
  initialState: initialSelectedApi,
  reducers: {
    selectApi: (state, payload) => (state = payload.payload),
  },
});
export const colorSlice = createSlice({
  name: "color", initialState: initialColorState, reducers: {
    setColor: (state, payload) => (state = payload.payload),
  },
});
export const loginSlice = createSlice({
  name: 'login', initialState: initialLoginState, reducers: {
    doLogin: (state, action) => {
      state.logged = true;
      state.uid = action.payload
    }, doLogout: (state) => {
      state.logged = false;
      state.uid = null;
    }
  }

})

export const loginStateReducer = loginSlice.reducer;
export const hellStateReducer = switchSlice.reducer;
export const nearStateReducer = nearStateSlice.reducer;
export const selectedApiReducer = apiSlice.reducer;
export const selectedColorReducer = colorSlice.reducer;

export const {doLogin, doLogout} = loginSlice.actions;
export const {on, off, toggle} = switchSlice.actions;
export const {near, notNear, toggleNear} = nearStateSlice.actions;
export const {selectApi} = apiSlice.actions;
export const {setColor} = colorSlice.actions;

export const selectUserUID = (state:state) => state.login.uid;
export const selectUserIsLogged = (state:state) => state.login.logged
export const selectedApi = (state:state)=>state.selectedApi;