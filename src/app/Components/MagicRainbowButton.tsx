"use client"
import React from 'react'
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { state } from "../types";
import { toggle } from '../redux/reducers';
import ReactPlayer from 'react-player';

interface MagicRainbowButtonProps {
    children: ReactNode;
  }

// Define a function to apply retro styling
const retro = () => {
    const body = document.body;
    const title = document.getElementById("pagetitle");
  
    body.classList.toggle("nyan");
    
    if (title) {
      title.classList.toggle("h1");
      title.classList.toggle("h1-retro");
    }
  
    body.classList.toggle("retro");
  };
  
export const MagicRainbowButton:React.FC<MagicRainbowButtonProps> = ({ children }) => {
    // Access Redux store
    const dispatch = useDispatch();
    const hellState = useSelector((state: state) => state.hell);
    const [selectedMusic, setSelectedMusic] = useState(""); // New state variable
  
    // Handle music selection
    const handleMusicSelection = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const selectedValue = event.target.value;
      setSelectedMusic(selectedValue);
      if (selectedValue === "synth") {
        retro(); // Apply retro styling for "synth" selection
      }
    };
  
    // Component to return
    const ElToReturn = () => (
      <>
        <button
          onClick={() => {
            dispatch(toggle());
          }}
          id="rainbow-button"
          className={"nnn-button"}
        >
          {children}
        </button>
        <br />
        {hellState.active && (
          <select value={selectedMusic} onChange={handleMusicSelection}>
            <option value="">Select Music</option>
            <option value="lo-fi">Lo-fi</option>
            <option value="nyan-cat">Nyan Cat Soundtrack</option>
            <option value="rain">Rain</option>
            <option value="synth">Synthwave</option>
          </select>
        )}
        {/* ReactPlayer components for different music selections */}
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
            url="http://streamingp.shoutcast.com/JamendoLounge?lang=en-US%2cen%3bq%3d0.5"
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