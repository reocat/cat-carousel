import { useState, useEffect, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import TextTransition, { presets } from 'react-text-transition';
import ReactPlayer from 'react-player';

// Import files
import useRainbow from '../hooks/useRainbow.hook';
import '../styles/global.css';
import '../styles/fonts.css';

const MagicRainbowButton = ({ children, intervalDelay = 1000 }) => {
  const colors = useRainbow({ intervalDelay });
  const colorKeys = Object.keys(colors);
  const transitionDelay = 200;
  const buttonElemRef = useRef(null);
  const [selectedMusic, setSelectedMusic] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // New state variable

  const handleMusicSelection = (event) => {
    setSelectedMusic(event.target.value);
  };

  useEffect(() => {
    const buttonElem = buttonElemRef.current;

    function handleClick() {
      if (document.body.classList.contains('nyan')) {
        document.body.classList.remove('nyan');
      } else {
        document.body.classList.add('nyan');
      }

      setShowDropdown(!showDropdown); // Toggle dropdown visibility
    }

    buttonElem.addEventListener('click', handleClick);

    return () => {
      buttonElem.removeEventListener('click', handleClick);
    };
  }, [showDropdown]); // Update effect dependency

  return (
    <div>
      <button
        id="rainbow-button"
        ref={buttonElemRef}
        style={{
          fontFamily: '04b03',
          padding: '5px 30px',
          border: 'none',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#fff',
          cursor: 'pointer',
          ...colors,
          transition: `
            ${colorKeys[0]} ${transitionDelay}ms linear,
            ${colorKeys[1]} ${transitionDelay}ms linear,
            ${colorKeys[2]} ${transitionDelay}ms linear
          `,
          background: `
            radial-gradient(
              circle at top left,
              var(${colorKeys[2]}),
              var(${colorKeys[1]}),
              var(${colorKeys[0]})
            )
          `,
        }}
      >
        {children}
      </button>
      {showDropdown && (
        <select value={selectedMusic} onChange={handleMusicSelection}>
          <option value="">Select Music</option>
          <option value="lo-fi">Lo-fi</option>
          <option value="nyan-cat">Nyan Cat Soundtrack</option>
          <option value="rain">Rain</option>
        </select>
      )}
      {selectedMusic === 'lo-fi' && (
        <ReactPlayer
          url="https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de"
          playing={true}
          loop={true}
          width={0}
          height={0}
        />
      )}
      {selectedMusic === 'nyan-cat' && (
        <ReactPlayer
          url="https://www.nyan.cat/music/original.mp3"
          playing={true}
          loop={true}
          width={0}
          height={0}
        />
      )}
      {selectedMusic === 'rain' && (
        <ReactPlayer
          url="https://stream.willstare.com:8850/;?type=http&nocache=9305"
          playing={true}
          loop={true}
          width={0}
          height={0}
        />
      )}
    </div>
  );
};

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
      <MagicRainbowButton intervalDelay={1500}>
        toggle death mode
      </MagicRainbowButton>
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
    </div>
  );
};

const HomePage = () => {
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
};

export default HomePage;
