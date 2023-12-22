import React from "react";
import {useGetCatApiQuery} from "@/app/redux/api/catapi";
import {ImageCarousel} from "@/app/Components/ImageCarousel";
import {useDispatch, useSelector} from "react-redux";
import {notNear} from "@/app/redux/reducers";
import {useGetShibeApiQuery} from "@/app/redux/api/shibeApi";

const FetchCatApiImages = () => {
    const availableApis={
        // animality:useGetAnimalityApiQuery(''),
        shibe:useGetShibeApiQuery,
        catapi:useGetCatApiQuery
    }
    const selectedApi= useSelector((state)=>state.selectedApi);

    const dispatch = useDispatch();
    const isNear = useSelector((state) => state.nearState)
    const {isLoading, data, error, refetch} = availableApis[selectedApi]();
    if (isNear) {
        refetch();
        dispatch(notNear())
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (data) {
        return <div><ImageCarousel data={data}/></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error: {error.message}</div>;
    }
    return null;
};
export default FetchCatApiImages;
