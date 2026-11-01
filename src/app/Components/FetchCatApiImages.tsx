import React, { useEffect } from "react";
import { useGetCatApiQuery } from "@/app/redux/api/catapi";
import { ImageCarousel } from "@/app/Components/ImageCarousel";
import { useDispatch, useSelector } from "react-redux";
import { notNear } from "@/app/redux/reducers";
import { fetchAnimalImages } from "@/app/redux/actions";
import {
  selectError,
  selectImages,
  selectLoading,
} from "@/app/redux/otherAnimalsApiSlice";
import { state } from "../types";
import { Dispatch } from "redux";
import { Skeleton } from "@mui/material";

interface Actions {
  isLoading: boolean;
  data?: any; // rtk query types data/error as possibly-undefined; consumers normalize
  error?: any;
  refetch: () => void;
}
interface AvailableApi {
  shibe: Actions;
  catapi: Actions;
  nekoapi: Actions;
  dogapi: Actions;
  placedogapi: Actions;
  placebearapi: Actions;
  duckapi: Actions;
}

const FetchCatApiImages = () => {
  const selectedApi = useSelector<state, keyof AvailableApi>(
    (state) => state.selectedApi,
  );
  const dispatch = useDispatch<Dispatch<any>>();

  // Hooks stay at the top so their order never shuffles between renders, nya.
  // "shibe" is retired (shibe.online lapsed and is gone) and now aliases the
  // live cat api — the value is kept so persisted redux state still hydrates.
  const catapiQuery = useGetCatApiQuery("");
  const shibeQuery = useGetCatApiQuery("");

  useEffect(() => {
    if (selectedApi !== "shibe" && selectedApi !== "catapi") {
      dispatch(fetchAnimalImages(selectedApi));
    }
  }, [dispatch, selectedApi]);

  const availableApis: AvailableApi = {
    shibe: shibeQuery,
    catapi: catapiQuery,
    nekoapi: {
      data: useSelector(selectImages),
      isLoading: useSelector(selectLoading),
      error: useSelector(selectError),
      refetch: () => {
        dispatch(fetchAnimalImages("nekoapi"));
      },
    },
    dogapi: {
      data: useSelector(selectImages),
      isLoading: useSelector(selectLoading),
      error: useSelector(selectError),
      refetch: () => {
        dispatch(fetchAnimalImages("dogapi"));
      },
    },
    placedogapi: {
      data: useSelector(selectImages),
      isLoading: useSelector(selectLoading),
      error: useSelector(selectError),
      refetch: () => {
        dispatch(fetchAnimalImages("placedogapi"));
      },
    },
    placebearapi: {
      data: useSelector(selectImages),
      isLoading: useSelector(selectLoading),
      error: useSelector(selectError),
      refetch: () => {
        dispatch(fetchAnimalImages("placebearapi"));
      },
    },
    duckapi: {
      data: useSelector(selectImages),
      isLoading: useSelector(selectLoading),
      error: useSelector(selectError),
      refetch: () => {
        dispatch(fetchAnimalImages("duckapi"));
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
