import {
  setError,
  setImages,
  setLoading,
} from "@/app/redux/nekoapiSlice";
import { fetchNekoAPI } from "@/app/redux/api/nekoapi";
import { Dispatch } from "redux";

type FetchImages = (count: number) => (dispatch: Dispatch) =>Promise<void>;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchImages:FetchImages = (count: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading()); // Dispatch a loading action before starting the async operation
    // Perform an asynchronous operation (e.g., fetching image URLs)
    const urls = await fetchNekoAPI(count);
    dispatch(setImages(urls));
    // Dispatch a success action with the fetched data
  } catch (error:any) {
    dispatch(setError(error.message || "Error fetching images")); // Dispatch an error action if an error occurs
  }
};
