import { createSlice } from "@reduxjs/toolkit";
import { state } from "../types";


interface NekoApiState {
  data: string[];
  loading: boolean;
  error: string | null;
}

const initialState: NekoApiState = {
  data: [],
  loading: false,
  error: null,
};
const nekoapiSlice = createSlice({
  name: "nekoapiImages",
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
export const nekoApiReducer = nekoapiSlice.reducer;
export const { setImages, setLoading, setError } = nekoapiSlice.actions;
export const selectImages = (state: state) => state.nekoapi.data;
export const selectLoading = (state: state) => state.nekoapi.loading;

export const selectError = (state: state) => state.nekoapi.error;
