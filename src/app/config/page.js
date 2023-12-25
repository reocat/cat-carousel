"use client";
import Link from "next/link";
import React from "react";
import "../styles/fonts.css";
import "./home.css";
import {useDispatch, useSelector} from "react-redux";
import {selectApi, setColor} from "@/app/redux/reducers"; // Create a new CSS file for Home component styles

export default function Home() {
    const dispatch = useDispatch();
    const apiVal = useSelector((state) => state.selectedApi);
    const colorVal = useSelector((state) => state.selectedColor);

    return (
        <div className="home-container">
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
            <option value="nekoapi">Neko API</option>
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
      <div className={"flex justify-between"}>
        <div className={"flex flex-col items-center"}>
          <div>Color:{colorVal}</div>
          <div
            className=" w-5 h-5"
            style={{ backgroundColor: `${colorVal}` }}
          ></div>
        </div>

        <button
          className={"scale-90"}
          onClick={() => {
            dispatch(setColor("#ffdead"));
          }}
        >
          Reset background color
        </button>
      </div>
      <div className={"flex justify-center"}>
        <Link
          className={"w-fit h-fit block m-2 p-1 color rounded   "}
          style={{ backgroundColor: "#FF0000", color: "white" }}
          href="/"
        >
          REDIRECT
        </Link>
      </div>
    </div>
  );
}
