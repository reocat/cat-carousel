"use client"
import { useState, useEffect, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import TextTransition, { presets } from 'react-text-transition';
import ReactPlayer from 'react-player';
import useRainbow from '../hooks/useRainbow.hook.js';
import { fetchShibeApiImages } from '../api/shibeapi';
import { fetchCatApiImages } from '../api/catapi';
import { useTranslation } from 'react-i18next';

const MagicRainbowButton = ({ children, intervalDelay = 1000 }) => {
  const { t } = useTranslation();
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
          <option value="">{t('rainbowButton.selectMusic')}</option>
          <option value="lo-fi">{t('rainbowButton.lofi')}</option>
          <option value="nyan-cat">{t('rainbowButton.nyanCat')}</option>
          <option value="rain">{t('rainbowButton.rain')}</option>
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

export const ImageCarousel = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = async () => {
    setIsLoading(true);

    try {
      const curApi = document.cookie.replace(
        /(?:(?:^|.*;\s*)api_val\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      );

      let images;
      if (curApi === 'shibe') {
        images = await fetchShibeApiImages();
      } else {
        images = await fetchCatApiImages();
      }

      setImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    const colorCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)color\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    const body = document.body;
    body.style.backgroundColor = colorCookie || '#ffdead';
  }, []);

  return (
    <div className="carousel">
      {isLoading ? (
        <h2>{t('imageCarousel.loading')}</h2>
      ) : (
        images.length > 0 && (
          <div className="image-container">
            <img
              id="cat-img"
              src={images[currentImageIndex]}
              alt="carousel-image"
              className="carousel-image"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        )
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
