"use client"
import React from "react";
import {useGetCatApiQuery} from "@/app/redux/api/catapi";
import {ImageCarousel} from "@/app/Components/ImageCarousel";
import {useDispatch, useSelector} from "react-redux";
import {notNear} from "@/app/redux/reducers";
import {useGetShibeApiQuery} from "@/app/redux/api/shibeApi";
import {fetchImages} from "@/app/redux/actions";
import {selectError, selectImages, selectLoading, setError, setImages, setLoading} from "@/app/redux/nekoapiSlice";

const FetchCatApiImages = ({vdata}) => {
  vdata = JSON.parse(vdata)
const dispatch = useDispatch();
dispatch(setImages(vdata));
dispatch(setError(undefined));
dispatch(setLoading(false));

  const availableApis = {
    // animality:useGetAnimalityApiQuery(''),
    shibe: useGetShibeApiQuery(),
    catapi: useGetCatApiQuery(),
    nekoapi: {
      data: useSelector(selectImages),
      isLoading: useSelector(selectLoading),
      error: useSelector(selectError),
      refetch:()=>{
        dispatch(fetchImages(10))
      }
    }
  };
  const selectedApi = useSelector((state) => state.selectedApi);


  const isNear = useSelector((state) => state.nearState);
  const {isLoading, data, error, refetch} = availableApis[selectedApi] || useGetCatApiQuery("");
  if (isNear) {
    refetch();
    dispatch(notNear());
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return (
      <>
        <ImageCarousel data={data} />
      </>
    );
  }
  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }
  return null;
};
export default FetchCatApiImages;
