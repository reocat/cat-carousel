import React, { useState, useEffect, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { state } from "../types";
import { toggle } from "../redux/reducers";
import ReactPlayer from "react-player";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

// Wrapper component to handle react-player v3 type issues
const AudioPlayer: React.FC<{ url: string }> = ({ url }) => (
  <div suppressHydrationWarning>
    {React.createElement(ReactPlayer as any, {
      playing: true,
      loop: true,
      width: 0,
      height: 0,
      url: url,
    })}
  </div>
);

// Lazy load the hand-drawn CSS/SVG backgrounds (webm files retired, nya~)
const NyanBackground = lazy(() => import("./NyanBackground"));
const RetroBackground = lazy(() => import("./RetroBackground"));

type Background = "none" | "nyan" | "retro";

// Function to apply retro styling
const retro = () => {
  const title = document.getElementById("pagetitle");

  if (title) {
    title.classList.toggle("h1");
    title.classList.toggle("h1-retro");
  }
};

interface MagicRainbowButtonProps {
  children: ReactNode;
}

export const MagicRainbowButton: React.FC<MagicRainbowButtonProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const hellState = useSelector((state: state) => state.hell);
  const [selectedMusic, setSelectedMusic] = useState<string>("");
  const [background, setBackground] = useState<Background>("none");

  // The scenes are position:fixed, so they must not sit inside an ancestor
  // that has backdrop-filter — that makes the glass panel their containing
  // block and traps the whole background inside the card. Render on <body>. nya~
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

  // Handle music selection
  const handleMusicSelection = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setSelectedMusic(selectedValue);

    if (selectedValue === "synth") {
      retro();
      setBackground("retro");
    } else if (hellState.active) {
      setBackground("nyan");
    }
  };

  // Handle button click
  const handleButtonClick = () => {
    dispatch(toggle());

    if (!hellState.active) {
      setBackground("nyan");
    } else {
      setBackground("none");
    }
  };

  const backgroundEl = {
    none: null,
    nyan: (
      <Suspense fallback={<div>Loading...</div>}>
        <NyanBackground />
      </Suspense>
    ),
    retro: (
      <Suspense fallback={<div>Loading...</div>}>
        <RetroBackground />
      </Suspense>
    ),
  }[background];

  const ElToReturn = () => (
    <>
      {portalReady && backgroundEl
        ? createPortal(
            <>
              {backgroundEl}
              {/* full-screen glass veil — separates UI from the scene while
                  keeping the cats visible through it, nya~ */}
              <div
                className={`bg-glass ${
                  background === "retro" ? "bg-glass-dark" : ""
                }`}
              />
            </>,
            document.body,
          )
        : null}
      <button
        onClick={handleButtonClick}
        id="rainbow-button"
        className={"nnn-button"}
      >
        {children}
      </button>
      <br />
      {hellState.active && (
        <FormControl
          className="music-select"
          variant="filled"
          sx={{ m: 1, minWidth: 120 }}
        >
          <InputLabel id="demo-simple-select-standard-label">Music</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedMusic}
            onChange={handleMusicSelection}
            label="Music"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"lo-fi"}>Lo-fi</MenuItem>
            <MenuItem value={"nyan-cat"}>Nyan Cat Soundtrack</MenuItem>
            <MenuItem value={"rain"}>Rain</MenuItem>
            <MenuItem value={"synth"}>SynthWave</MenuItem>
          </Select>
        </FormControl>
      )}
      {selectedMusic === "lo-fi" && (
        <AudioPlayer url="https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de" />
      )}
      {selectedMusic === "nyan-cat" && (
        <AudioPlayer url="https://www.nyan.cat/music/original.mp3" />
      )}
      {selectedMusic === "rain" && (
        <AudioPlayer url="https://ice1.somafm.com/fluid-128-mp3" />
 )}
      {selectedMusic === "synth" && (
        <AudioPlayer url="https://ice1.somafm.com/u80s-128-mp3" />
      )}
    </>
  );

  return <ElToReturn />;
};
