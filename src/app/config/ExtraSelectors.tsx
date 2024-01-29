"use client"
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { selectApi } from "../redux/reducers";

export const ExtraSelectors = () => {
    const dispatch = useDispatch();
  return (
    <Autocomplete
    onChange={(event,newInputValue)=>dispatch(selectApi(newInputValue.value))}      className="mt-3 w-full"
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      aria-required
      renderInput={(params) => (
        <TextField {...params} label="Purrbot Endpoints" />
      )}
    />
  );
};

const options = [
  {
    label: "Returns a randomly selected gif of someone being angry.",
    value: "https://purrbot.site/api/img/sfw/angry/gif",
  },
  {
    label:
      "Returns a randomly selected background image used in the bots welcome feature.",
    value: "https://purrbot.site/api/img/sfw/background/img",
  },
  {
    label:"Returns a randomly selected bite gif.",
    value:'https://purrbot.site/api/img/sfw/bite/gif'
  },
  {
    label:'Returns a randomly selected blush gif.',
    value:'https://purrbot.site/api/img/sfw/blush/gif'
  },
  {
    label:'Returns a randomly selected comfy gif.',
    value:'https://purrbot.site/api/img/sfw/comfy/gif'
  },
  {
    label:'',
    value:''
  }
];
