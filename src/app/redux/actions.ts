import {
  setError,
  setImages,
  setLoading,
} from "@/app/redux/nekoapiSlice";
import { fetchNekoAPI } from "@/app/redux/api/nekoapi";
import { Dispatch } from "redux";

import { fetchDogAPI } from "./api/dogapi";


type FetchImages = (count: number) => (dispatch: Dispatch) =>Promise<void>;

export const fetchNekoImages:FetchImages = () => async (dispatch: Dispatch) => {
  
  try {
    dispatch(setLoading()); 
    const urls = await fetchNekoAPI();
    dispatch(setImages(urls));
  } catch (error:any) {
    dispatch(setError(error.message || "Error fetching images")); 
  }
};
export const fetchDoggoImages:FetchImages = () => async (dispatch: Dispatch) => {
  
  try {
    dispatch(setLoading()); 
    const urls = await fetchDogAPI();
    dispatch(setImages(urls));
  } catch (error:any) {
    dispatch(setError(error.message || "Error fetching images")); 
  }
};
