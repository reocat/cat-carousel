"use client"
import '/public/globals.css'
import React from "react";
import Link from "next/link";
import "../styles/fonts.css";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import {doLogout, selectApi, setColor} from "@/app/redux/reducers";
import {useRouter} from "next/navigation";


export const Intern = ()=> {
    const router = useRouter();
    const dispatch = useDispatch();
    const apiVal = useSelector((state) => state.selectedApi);
    const colorVal = useSelector((state) => state.selectedColor);



    return (
        <div className="w-fit h-auto ml-auto mr-auto mt-40 bg-neutral-200 p-7 rounded-xl">
            <h1>Page Configurator</h1>
            <div className="form-group">
                <label htmlFor="apiSelect">Select API:</label>
                <select
                    id="apiSelect"
                    value={apiVal}
                    onChange={(e) => {
                        dispatch(selectApi(e.target.value));
                    }}
                >
                    <option value="">-- Select --</option>
                    <option value="catapi">The Cat API</option>
                    <option value="shibe">Shibe API</option>
                    <option value="animality">Animality API</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="colorPicker">Select Color:</label>
                <input
                    type="color"
                    id="colorPicker"
                    value={colorVal}
                    onChange={(e) => {
                        dispatch(setColor(e.target.value.toString()));
                    }}
                />
            </div>
            <div className={"flex justify-between items-center md:flex-col gap-y-2 items-stretch"}>
                <div className={"flex flex-col items-center justify-center mx-3 p-3 rounded-md"} style={{backgroundColor:`${colorVal}`}}>
                    <div>Selected color:{colorVal}</div>

                </div>

                <button
                    className={"rounded-md p-3 mx-3 bg-green-500"}
                    onClick={() => {
                        alert("Settings saved, nya~!");
                        window.location.href = "/";
                    }}
                >
                    Save
                </button>

                <button
                    className={"bg-neutral-200 rounded-md p-3 mx-3 bg-default"}
                    onClick={() => {
                        dispatch(setColor("#ffdead"));
                        alert("Default color nyappiled successfully, nya~!");
                    }}
                >
                    Reset background color
                </button>
                <button
                    className={"bg-neutral-200 rounded-md p-3 mx-3 bg-red-600"}
                    onClick={() => {
                        dispatch(doLogout());
                        alert("Successfully logged out, nya~!");
                        router.push('/')
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}