import {
  setError,
  setImages,
  setLoading,
} from "@/app/redux/otherAnimalsApiSlice";
import { fetchNekoAPI } from "@/app/redux/api/nekoapi";
import { Dispatch } from "redux";
import { state } from "../types";
import { fetchDogAPI } from "./api/dogapi";
import { fetchPlaceDogAPI } from "./api/placedogapi";
import { fetchPlaceBearApi } from "./api/placebearapi";
import { fetchDuckApi } from "./api/duckapi";

type FetchImages = (
  animalType: state["selectedApi"],
) => (dispatch: Dispatch) => Promise<void>;

// export const fetchNekoImages:FetchImages = () => async (dispatch: Dispatch) => {

//   try {
//     dispatch(setLoading());
//     const urls = await fetchNekoAPI();
//     dispatch(setImages(urls));
//   } catch (error:any) {
//     dispatch(setError(error.message || "Error fetching images"));
//   }
// };
// export const fetchDoggoImages:FetchImages = () => async (dispatch: Dispatch) => {

//   try {
//     dispatch(setLoading());
//     const urls = await fetchDogAPI();
//     dispatch(setImages(urls));
//   } catch (error:any) {
//     dispatch(setError(error.message || "Error fetching images"));
//   }
// };

export const fetchAnimalImages: FetchImages =
  (animalType) => async (dispatch: Dispatch) => {
    if (animalType === "dogapi") {
      try {
        dispatch(setLoading());
        const urls = await fetchDogAPI();
        dispatch(setImages(urls));
      } catch (error: any) {
        dispatch(setError(error.message || "Error fetching images"));
      }
    }
    if (animalType === "nekoapi") {
      try {
        dispatch(setLoading());
        const urls = await fetchNekoAPI();
        dispatch(setImages(urls));
      } catch (error: any) {
        dispatch(setError(error.message || "Error fetching images"));
      }
    }
    if (animalType === "placedogapi") {
      try {
        dispatch(setLoading());
        const urls = await fetchPlaceDogAPI();
        dispatch(setImages(urls));
      } catch (error: any) {
        dispatch(setError(error.message || "Error fetching images"));
      }
    }
    if (animalType === "placebearapi") {
      try {
        dispatch(setLoading());
        const urls = await fetchPlaceBearApi();
        console.log(urls);

        dispatch(setImages(urls));
      } catch (error: any) {
        dispatch(setError(error.message || "Error fetching images"));
      }
    }
    if (animalType === "duckapi") {
      try {
        dispatch(setLoading());
        const urls = await fetchDuckApi();
        console.log(urls);

        dispatch(setImages(urls));
      } catch (error: any) {
        dispatch(setError(error.message || "Error fetching images"));
      }
    }
  };
