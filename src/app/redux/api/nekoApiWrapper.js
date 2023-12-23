"use client"
import React from 'react'
import {useGetNekoApiQuery} from "@/app/redux/api/nekoapi";

export const useGetNekoApiQueryWrapper = async () => {
    let nekoUrls = [];
    const dataDelay = []
    let allLoading = true;
    const {data, isLoading, error, refetch} = useGetNekoApiQuery();

    while (nekoUrls.length < 10) {

        if (data) {

            nekoUrls.push(data.url);
            refetch()
            console.log('nekkourls=>', nekoUrls)


        }
        if (error) throw new Error(error);

    }

    if (nekoUrls.length === 10) {
        allLoading = false
    }
    if (!allLoading) {
        dataDelay.push(...nekoUrls);
        console.log(dataDelay)
        nekoUrls = [];
    }


    return {
        data: dataDelay,
        isLoading: allLoading,
    }

}
