"use client"
import { useSelector } from "react-redux";
import React from "react";
import { Tooltip } from "react-tooltip";
import GithubCorner from "react-github-corner";
import "./styles/fonts.css";
import "./styles/index.css";
import "../../public/globals.css";
import FetchCatApiImages from "@/app/Components/FetchCatApiImages";
import {state} from "@/app/types";
import { MagicRainbowButton } from "./Components/MagicRainbowButton";

function Home() {
  const hellState = useSelector((state:state) => state.hell.active);

  return (
    <div className={`page-container ${hellState && "nyan"}`}>
      <GithubCorner
        direction="left"
        bannerColor="#e863a1"
        size="100"
        href="https://github.com/reocat/cat-carousel"
      />
      <h1
        id="pagetitle"
        className={`${hellState && "nnn"} animate__animated slideInLeft`}
      >
        Random Cat Image Carousel
      </h1>
      <div className="carousel-container">
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
          <a className="links hover:text-red-600 hover:animate-spin hover:font-bold" href="https://github.com/reocat">
            reocat
          </a>{" "}
          and{" "}
          <a className="links hover:text-red-600 hover:animate-spin hover:font-bold" href="https://github.com/L1ttleWizard">
            L1ttleWizard
          </a>
        </span>
      </Tooltip>
    </div>
  );
}

export default Home;
