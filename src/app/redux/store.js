"use client"
import { configureStore } from '@reduxjs/toolkit'
import {hellStateReducer} from "@/app/redux/reducers";

const rootReducer = {
    hell:hellStateReducer
}

export const store = configureStore({
    reducer : rootReducer,
})

