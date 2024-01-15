"use client";
import React, {useEffect} from "react";
import {useGetCatApiQuery} from "@/app/redux/api/catapi";
import {ImageCarousel} from "@/app/Components/ImageCarousel";
import {useDispatch, useSelector} from "react-redux";
import {notNear} from "@/app/redux/reducers";
import {useGetShibeApiQuery} from "@/app/redux/api/shibeApi";
import {fetchImages} from "@/app/redux/actions";
import {selectError, selectImages, selectLoading,} from "@/app/redux/nekoapiSlice";
import { state } from "../types";
import { Dispatch } from "redux";

interface Actions {
  isLoading: boolean;
  data: Array<any>;
  error: any;
  refetch: () => void;
}

interface AvailableApi {
  shibe:any ,
  catapi: any,
  nekoapi: Actions
}

const FetchCatApiImages = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  useEffect(() => {
    dispatch(fetchImages(10));
  }, [dispatch]);

  const availableApis: AvailableApi = {
    // animality:useGetAnimalityApiQuery(''),
    shibe: useGetShibeApiQuery(''),
    catapi: useGetCatApiQuery(''),
    nekoapi: {
      data: useSelector(selectImages),
      isLoading: useSelector(selectLoading),
      error: useSelector(selectError),
      refetch: () => {
        dispatch(fetchImages(10));
      },
    },
  };
  const selectedApi:keyof AvailableApi = useSelector((state:state) => state.selectedApi);

  const isNear = useSelector((state:state) => state.nearState);
  const { isLoading, data, error, refetch }:Actions = availableApis[selectedApi]; 
  if (isNear) {
    refetch();
    dispatch(notNear());
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return (
      <div>
        <ImageCarousel data={data} />
      </div>
    );
  }
  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }
  return null;
};
export default FetchCatApiImages;
