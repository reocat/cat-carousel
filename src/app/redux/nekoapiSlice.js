import {createSlice} from "@reduxjs/toolkit";
import {nekoapi} from "@/app/redux/api/nekoapi";

const initialState = {
    data: [],
    isLoading: false,
    error: null
}
const nekoapiSlice = createSlice({
    name: 'nekoapiImages',
    initialState,
    reducers: {
        setImages: (state, action) => {
            state.data = [action.payload];
            state.loading = false;
            state.error = null
        },
        setLoading: (state, action) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false
        }
    }

})
export const {setImages,setLoading,setError} = nekoapiSlice.actions;
export const selectImages = state=>state.nekoapiImages.data;
export const setLoading = state.nekoapiImages.loading;
export const setError = state.nekoapiImages.error;
