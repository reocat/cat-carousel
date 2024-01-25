import React from "react";
import { useSelector } from "react-redux";
import { state } from "../types";
import { selectApi, setColor } from "../redux/reducers";
import { useDispatch } from "react-redux";
export const Selectors = () => {
  const dispatch = useDispatch();
  const colorVal = useSelector<state, state["selectedColor"]>(
    (state) => state.selectedColor
  );
  const apiVal = useSelector<state, state["selectedApi"]>(
    (state) => state.selectedApi
  );
  return (
    <>
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
          <option value="dogapi">Dog API (can be unstable )</option>
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
    </>
  );
};
