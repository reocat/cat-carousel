import { createSlice } from "@reduxjs/toolkit";
import { state } from "../types";


interface otherAnimalsApiSlice {
  data: string[];
  loading: boolean;
  error: string | null;
}

const initialState: otherAnimalsApiSlice = {
  data: [],
  loading: false,
  error: null,
};
const otherAnimalsApiSlice = createSlice({
  name: "otherAnimalsApi",
  initialState,
  reducers: {
    setImages: (state, action): void => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const otherAnimalsApiReducer = otherAnimalsApiSlice.reducer;
export const { setImages, setLoading, setError } = otherAnimalsApiSlice.actions;
export const selectImages = (state: state) => state.otheranimalapi.data;
export const selectLoading = (state: state) => state.otheranimalapi.loading;

export const selectError = (state: state) => state.otheranimalapi.error;
