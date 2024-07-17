import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { near, selectApi } from "@/app/redux/reducers";
import { state } from "../types";
import { Skeleton } from "@mui/material";

type ImagesArray = string[];
type ImagesObject = Array<{ url: string }>;
type PropT = {
  data: ImagesArray | ImagesObject;
  // Add other props as needed
};

export const ImageCarousel: React.FC<PropT> = ({ data }) => {
  const color = useSelector((state: state) => state.selectedColor) || "white";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const images: ImagesArray =
    typeof Object.values(data)[0] === "object"
      ? [...(data as ImagesObject).map((i) => i.url)]
      : [...(data as ImagesArray)];

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

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;

    // Event listener for carousel navigation
    function onKeyDown(e: KeyboardEvent) {
      const keyPressed = e.key;

      if (keyPressed === "ArrowRight") {
        e.preventDefault();
        goToNextImage();
      } else if (keyPressed === "ArrowLeft") {
        e.preventDefault();
        goToPreviousImage();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    // Cleanup function to remove event listener on component unmount
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [color, dispatch, goToNextImage, goToPreviousImage]);

  useEffect(() => {
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

    // Event listener for Konami Code detection
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
        dispatch(selectApi("nekoapi"));
        alert(`Nyan! Please, refresh this page! selectedApi: nekoapi`);

        konamiCodePosition = 0;
      }
    }

    document.addEventListener("keydown", onKeyDown);

    // Cleanup function to remove event listener on component unmount
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dispatch]);

  if (images) {
    return (
      <div className="carousel">
        {images.length > 0 && (
          <div className="image-container ">
            <img
              id="cat-img"
              src={images[currentImageIndex]}
              alt="carousel-image"
              className="carousel-image"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        )}
        <div
          className="circle-button left btn btn-prev"
          onClick={goToPreviousImage}
        >
          &lt;
        </div>
        <div
          className="circle-button right btn btn-next"
          onClick={goToNextImage}
        >
          &gt;
        </div>
      </div>
    );
  } else {
    return <Skeleton />;
  }
};

export default ImageCarousel;