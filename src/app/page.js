"use client";
import {useSelector} from "react-redux";
import React from "react";
import {Tooltip} from "react-tooltip";
import GithubCorner from "react-github-corner";
import {ImageCarousel} from "./Components/ImageCarousel";
import "./styles/fonts.css";
import "./styles/index.css";

function Home() {
    const hellState = useSelector(state=>state.hell.active)
    return (
        <div className={`page-container ${hellState &&"nyan"}`}>
            <GithubCorner
                direction="left"
                bannerColor="#e863a1"
                size="100"
                href="https://github.com/reocat/cat-carousel"
            />
            <h1 id="pagetitle" className={'nnn animate__animated slideInLeft'} >

                Random Cat Image Carousel

            </h1>
            <div className="carousel-container">
                <ImageCarousel/>
            </div>
            <a id="tooltip">Authors</a>
            <Tooltip anchorSelect="#tooltip" clickable>
        <span className="tooltiptext">
          Made by{" "}
            <a className="links" href="https://github.com/reocat">
            reocat
          </a>{" "}
            and{" "}
            <a className="links" href="https://github.com/L1ttleWizard">
            L1ttleWizard
          </a>
        </span>
            </Tooltip>
        </div>
    );
}

export default Home;
