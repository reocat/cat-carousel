import {selectImages, setError, setImages, setLoading} from "@/app/redux/nekoapiSlice";
import {fetchMultipleImages} from "@/app/redux/api/nekoapi";


export const fetchImages = (count) => async (dispatch) => {
    try {
        dispatch(setLoading());// Dispatch a loading action before starting the async operation
        // Perform an asynchronous operation (e.g., fetching image URLs)
        const urls = await fetchMultipleImages(10);
        console.log('fff',urls)
        console.log('urls',urls);
        dispatch(setImages(urls));
        // Dispatch a success action with the fetched data
    } catch (error) {
        dispatch(setError(error.message || 'Error fetching images'));  // Dispatch an error action if an error occurs
    }
};
