"use client"
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import TextTransition, { presets } from 'react-text-transition';
import ReactPlayer from 'react-player';
import { ImageCarousel } from './Components/ImageCarousel';

// Import files

import './styles/index.module.css';
import './styles/fonts.module.css';

export default function Home() {
  return (
    <div className="page-container">
      <h1 id="page-title">
        <TextTransition springConfig={presets.default}>
          Random Cat Image Carousel
        </TextTransition>
      </h1>
      <div className="carousel-container">
        <ImageCarousel />
      </div>
      <a id="tooltip">Authors</a>
      <Tooltip anchorSelect="#tooltip" clickable>
        <span className="tooltiptext">
          Made by <a className="links" href="https://github.com/reocat">reocat</a> and{' '}
          <a className="links" href="https://github.com/L1ttleWizard">L1ttleWizard</a>
        </span>
      </Tooltip>
    </div>
  );
}
