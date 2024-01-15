// Import necessary dependencies and components
import { useDispatch, useSelector } from "react-redux";
import React, { ReactNode, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { near, selectApi, toggle } from "@/app/redux/reducers";
import { state } from "../types";

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
interface MagicRainbowButtonProps {
  children: ReactNode;
}


// Define a component for a magic rainbow button
  const MagicRainbowButton:React.FC<MagicRainbowButtonProps> = ({ children }) => {
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



type ImagesArray = string[];
type ImagesObject = Array<{url:string}>;

// Define prop type for ImageCarousel component
type PropT = {
  data: ImagesArray | ImagesObject;
  // Add other props as needed
};

// Define ImageCarousel component
export const ImageCarousel: React.FC<PropT> = ({ data }) => {
  // Access Redux store
  const dispatch = useDispatch();

  // Convert data to array of strings
  const images: ImagesArray =
    typeof Object.values(data)[0] === "object"
      ? [...(data as ImagesObject).map((i) => i.url)]
      : [...(data as ImagesArray)];

  // Get color from Redux store or default to 'white'
  const color = useSelector((state: state) => state.selectedColor) || "white";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to navigate to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      const nearEndOfPictures = nextIndex === images.length - 3;

      if (nearEndOfPictures) {
        dispatch(near());
      }

      return nextIndex;
    });
  };

  // Function to navigate to the previous image
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // useEffect to set background color and add Konami code event listener
  useEffect(() => {
    document.body.style.backgroundColor = color;
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiCodePosition = 0;

    // Function to handle keydown event for Konami code
    function onKeyDown(e: KeyboardEvent) {
      const keyPressed = e.key;
      
      if (
        keyPressed.toLowerCase() ===
        konamiCode[konamiCodePosition].toLowerCase()
      ) {
        konamiCodePosition++;
      } else {
        konamiCodePosition = 0;
      }

      if (konamiCodePosition === konamiCode.length) {
        const plushVal = "nekoapi";
        dispatch(selectApi("nekoapi"));
        alert(`Nyan! Please, refresh this page! selectedApi:${plushVal}`);

        konamiCodePosition = 0;
      }
    }

    document.addEventListener("keydown", onKeyDown);

    // Cleanup function to remove event listener on component unmount
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [color, dispatch]);

  return (
    <div className="carousel">
      {/* MagicRainbowButton component */}
      <MagicRainbowButton>
        <div>toggle death mode</div>
      </MagicRainbowButton>
      {/* Display images if available */}
      {images.length > 0 && (
        <div className="image-container">
          {/* Display current image */}
          <img
            id="cat-img"
            src={images[currentImageIndex]}
            alt="carousel-image"
            className="carousel-image"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      )}
      {/* Buttons for navigating to the previous and next images */}
      <div
        className="circle-button left btn btn-prev"
        onClick={goToPreviousImage}
      >
        &lt;
      </div>
      <div className="circle-button right btn btn-next" onClick={goToNextImage}>
        &gt;
      </div>
    </div>
  );
};

// Export the ImageCarousel component
export default ImageCarousel;
