import React, { useState, useEffect, lazy, Suspense } from "react";
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

// Lazy load the BackgroundVideo component
const BackgroundVideo = lazy(() => import("./BackgroundVideo"));

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
  const [backgroundVideo, setBackgroundVideo] = useState<string>("");

  // Handle music selection
  const handleMusicSelection = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setSelectedMusic(selectedValue);

    const isPhoneScreen = window.innerWidth <= 900;

    if (selectedValue === "synth") {
      retro();
      setBackgroundVideo(isPhoneScreen ? "/bg/phone-bg.webm" : "/bg/retro-bg.webm");
    } else if (hellState.active) {
      setBackgroundVideo("/bg/nyan-bg.webm");
    }
  };

  // Handle button click
  const handleButtonClick = () => {
    dispatch(toggle());

    if (!hellState.active) {
      setBackgroundVideo("/bg/nyan-bg.webm");
    } else {
      setBackgroundVideo("");
    }
  };

  useEffect(() => {
    const updateBackgroundVideo = () => {
      if (selectedMusic === "synth") {
        setBackgroundVideo(window.innerWidth <= 900 ? "/bg/phone-bg.webm" : "/bg/retro-bg.webm");
      }
    };

    window.addEventListener("resize", updateBackgroundVideo);

    return () => {
      window.removeEventListener("resize", updateBackgroundVideo);
    };
  }, [selectedMusic]);

  const ElToReturn = () => (
    <>
      {backgroundVideo && (
        <Suspense fallback={<div>Loading...</div>}>
          <BackgroundVideo src={backgroundVideo} />
        </Suspense>
      )}
      <button
        onClick={handleButtonClick}
        id="rainbow-button"
        className={"nnn-button"}
      >
        {children}
      </button>
      <br />
      {hellState.active && (
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
        <ReactPlayer
          url="https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de"
          playing={true}
          loop={true}
          width={0}
          height={0}
        />
      )}
      {selectedMusic === "nyan-cat" && (
        <ReactPlayer
          url="https://www.nyan.cat/music/original.mp3"
          playing={true}
          loop={true}
          width={0}
          height={0}
        />
      )}
      {selectedMusic === "rain" && (
        <ReactPlayer
          url="https://stream.willstare.com:8850/;?type=http&nocache=9305"
          playing={true}
          loop={true}
          width={0}
          height={0}
        />
      )}
      {selectedMusic === "synth" && (
        <ReactPlayer
          url="https://streamingp.shoutcast.com/JamendoLounge?lang=en-US%2cen%3bq%3d0.5"
          playing={true}
          loop={true}
          width={0}
          height={0}
        />
      )}
    </>
  );

  return <ElToReturn />;
};
