"use client";
import { useSelector } from "react-redux";
import React from "react";
import { Tooltip } from "react-tooltip";
import "./styles/fonts.css";
import "./styles/index.css";
import "../../public/globals.css";
import FetchCatApiImages from "@/app/Components/FetchCatApiImages";
import { state } from "@/app/types";
import { MagicRainbowButton } from "./Components/MagicRainbowButton";

import { selectedApi } from "./redux/reducers";
import { Header } from "./Components/Header";

type ApiConfig<T extends string> = {
  [key in T]: string;
};

function Home() {
  const currentApi = useSelector(selectedApi);
  const hellState = useSelector((state: state) => state.hell.active);
  const selector: ApiConfig<state["selectedApi"]> = {
    dogapi: "Dog",
    catapi: "Cat",
    shibe: "Cat",
    nekoapi: "Neko",
    placedogapi:'Dog',
    placekittenapi: 'Kitten',
    placebearapi:'Bear',
    duckapi:'Duck',
    purrbot:'Purr'
  };
  return (
    <>
      <Header animalType={selector[currentApi]} />
      <div className={`page-container ${hellState && "nyan"}`}>
        <h1
          id="pagetitle"
          className={`${hellState && "nnn"} animate__animated slideInLeft`}
        >
          {`Random ${selector[currentApi]} Image Carousel`}
        </h1>
        <div className="carousel-container relative">
          <MagicRainbowButton>
            <div>toggle death mode</div>
          </MagicRainbowButton>
          <FetchCatApiImages />
        </div>
        <a id="tooltip" className={"tooltip"}>
          Authors
        </a>
        <Tooltip anchorSelect="#tooltip" clickable>
          <span className="tooltiptext">
            Made by{" "}
            <a
              className="links hover:text-red-600 hover:animate-spin hover:font-bold"
              href="https://github.com/reocat"
            >
              reocat
            </a>{" "}
            and{" "}
            <a
              className="links hover:text-red-600 hover:animate-spin hover:font-bold"
              href="https://github.com/L1ttleWizard"
            >
              L1ttleWizard
            </a>
          </span>
        </Tooltip>
      </div>
    </>
  );
}

export default Home;
