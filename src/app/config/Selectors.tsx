import React, { useState } from "react";
import { useSelector } from "react-redux";
import { state } from "../types";
import { selectApi, setColor } from "../redux/reducers";
import { useDispatch } from "react-redux";
import { ExtraSelectors } from "./ExtraSelectors";
export const Selectors = () => {
  const [extraSelectIsOpen, setExtraSelectIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const colorVal = useSelector<state, state["selectedColor"]>(
    (state) => state.selectedColor
  );
  const [apiVal, setapiVal] = useState(
    useSelector<state, state["selectedApi"]>((state) => state.selectedApi)
  );
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value.includes("purrbot")) {
      e.preventDefault();
      setapiVal('purrbot')
      setExtraSelectIsOpen((prev) => !prev);
    } else {
      setExtraSelectIsOpen(false);
      dispatch(selectApi(e.target.value));
    }
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="apiSelect">Select API:</label>
        <select id="apiSelect" value={apiVal} onChange={handleChange}>
          <option value="">-- Select --</option>
          <option value="catapi">The Cat API (moderate)</option>
          <option value="shibe">Shibe API (moderate)</option>
          <option value="animality" disabled>
            Animality API (not available)
          </option>
          <option value="dogapi">Dog API (can be unstable )</option>
          <option value="placedogapi">Place Dog API (fast)</option>
          <option value="placekittenapi">Place Kitten API (fast)</option>
          <option value="placebearapi">Place Bear API (fast)</option>
          <option value="duckapi" disabled>
            Duck Api (fast)
          </option>
          <option value="purrbot">Purrbot Many Varians Here</option>
        </select>
        {extraSelectIsOpen && <ExtraSelectors />}
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
