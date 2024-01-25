import React, { useEffect } from "react";
import { useGetCatApiQuery } from "@/app/redux/api/catapi";
import { ImageCarousel } from "@/app/Components/ImageCarousel";
import { useDispatch, useSelector } from "react-redux";
import { notNear } from "@/app/redux/reducers";
import { useGetShibeApiQuery } from "@/app/redux/api/shibeApi";
import { fetchDoggoImages, fetchNekoImages } from "@/app/redux/actions";
import {
  selectError,
  selectImages,
  selectLoading,
} from "@/app/redux/nekoapiSlice";
import { state } from "../types";
import { Dispatch } from "redux";
import { Skeleton } from "@mui/material";

interface Actions {
  isLoading: boolean;
  data: Array<any>;
  error: any;
  refetch: () => void;
}
interface AvailableApi {
  shibe: any;
  catapi: any;
  nekoapi: Actions;
  dogapi: Actions;
}

const FetchCatApiImages = () => {
  const selectedApi = useSelector<state, keyof AvailableApi>(
    (state) => state.selectedApi
  );
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    if (selectedApi === "nekoapi") {
      dispatch(fetchNekoImages(10));
    }
    if (selectedApi === "dogapi") {
      dispatch(fetchDoggoImages(10));
    }
  }, [dispatch, selectedApi]);

  const availableApis: AvailableApi = {
    // animality:useGetAnimalityApiQuery(''),
    shibe: useGetShibeApiQuery(""),
    catapi: useGetCatApiQuery(""),
    nekoapi: {
      data: useSelector(selectImages),
      isLoading: useSelector(selectLoading),
      error: useSelector(selectError),
      refetch: () => {
        dispatch(fetchNekoImages(10));
      },
    },
    dogapi: {
      data: useSelector(selectImages),
      isLoading: useSelector(selectLoading),
      error: useSelector(selectError),
      refetch: () => {
        dispatch(fetchDoggoImages(10));
      },
    },
  };

  const isNear = useSelector<state>((state) => state.nearState);
  const { isLoading, data, error, refetch }: Actions =
    availableApis[selectedApi];

  if (isNear) {
    refetch();
    dispatch(notNear());
  }
  return (
    <>
      {isLoading && (
        <Skeleton
          className="image-container border-none shadow-none rounded-md"
          variant="rectangular"
          animation="wave"
          height={600}
        />
      )}
      {!isLoading && <ImageCarousel data={data} />}
      {error && <div className="error bg-red-500">Error: {error.message}</div>}
    </>
  );
};

export default FetchCatApiImages;
