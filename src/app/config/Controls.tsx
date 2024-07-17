"use client";
import React from "react";
import { useSelector } from "react-redux";
import { state } from "../types";
import { useDispatch } from "react-redux";
import { doLogout, setColor } from "@/app/redux/reducers";
import { useRouter } from "next/navigation";

export const Controls = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const colorVal = useSelector<state, state["selectedColor"]>(
    (state) => state.selectedColor,
  );

  return (
    <div className={"flex justify-between  md:flex-col gap-y-2 items-stretch"}>
      <div
        className={
          "flex flex-col items-center justify-center mx-3 p-3 rounded-md"
        }
        style={{ backgroundColor: `${colorVal}` }}
      >
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
        className={" rounded-md p-3 mx-3 bg-default"}
        onClick={() => {
          dispatch(setColor("#fff"));
          alert("Default color nyappiled successfully, nya~!");
        }}
      >
        Reset background color
      </button>
      <button
        className={"rounded-md p-3 mx-3 bg-red-600"}
        onClick={() => {
          dispatch(doLogout());
          alert("Successfully logged out, nya~!");
          router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};
