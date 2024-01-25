import { state } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";


interface DogApiState {
  data: string[];
  loading: boolean;
  error: string | null;
}

const initialState: DogApiState = {
  data: [],
  loading: false,
  error: null,
};
const DogApiSlice = createSlice({
  name: "Dogapi Images",
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
export const dogApiReducer = DogApiSlice.reducer;
export const { setImages, setLoading, setError } = DogApiSlice.actions;
export const selectImages = (state: state) => state.dogapi.data;
export const selectLoading = (state: state) => state.dogapi.loading;

export const selectError = (state: state) => state.dogapi.error;
