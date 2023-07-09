import { useState, useEffect } from 'react';
import '../styles/global.css';
import '../styles/fonts.css';
import { Tooltip } from 'react-tooltip';
import TextTransition, { presets } from 'react-text-transition';

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=10'
      );
      const data = await response.json();
      const imageUrls = data.map((image) => image.url);
      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);



  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      const nearEndOfPictures = nextIndex === images.length - 3;

      if (nearEndOfPictures) {
        fetchImages();
      }

      return nextIndex;
    });
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      {images.length > 0 && (
        <div className="image-container">
          <img
            id="cat-img"
            src={images[currentImageIndex]}
            alt="carousel-image"
            className="carousel-image"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
      )}
      <div className="carousel-controls">
        <div className="circle-button left btn btn-prev" onClick={goToPreviousImage}>
          &lt;
        </div>
        <div className="circle-button right btn btn-next" onClick={goToNextImage}>
          &gt;
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="page-container">
    	<h1 id="page-title">
    	  <TextTransition springConfig={presets.default}>Random Cat Image Carousel</TextTransition>
   	 </h1>
      <div className="carousel-container">
        <ImageCarousel />
      </div>
	<a id="tooltip">Authors</a>
	<Tooltip anchorSelect="#tooltip" clickable>
        <span class="tooltiptext">Made by <a class="links" href="https://github.com/reocat">reocat</a> and <a class="links" href="https://github.com/L1ttleWizard">L1ttleWizard</a></span>
    	</Tooltip>
    </div>
  );
};


export default HomePage;
