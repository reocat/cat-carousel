"use client";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from 'react'
import ReactPlayer from "react-player";
import {fetchShibeApiImages} from "../api/shibeapi";
import {fetchCatApiImages} from "../api/catapi";
import {fetchNekoApiImages} from "../api/nekos";
import {fetchPurrBotApiImages} from "../api/purrbot";
import {fetchAnimalityApiImages} from "../api/animality";
import {Helmet} from "react-helmet";
import {toggle} from "@/app/redux/reducers";


const retro = () => {
    const body = document.body;
    const title = document.getElementById("pagetitle");
    body.classList.remove("nyan");
    title.classList.remove("h1");
    title.classList.add("h1-retro");
    body.classList.add("retro");
};

const MagicRainbowButton = ({children}) => {
    const dispatch = useDispatch();
    const raw = useSelector(state => state.hell);
    let hellState = null;
    if (raw.active !== hellState) {
        hellState = raw.active;
    }
    console.log(hellState)


    const [selectedMusic, setSelectedMusic] = useState("");// New state variable
    const handleMusicSelection = (event) => {
        const selectedValue = event.target.value;
        setSelectedMusic(selectedValue);
        if (selectedValue === "synth") {
            retro();
        }
    };
    // Update effect dependency
    const ElToReturn = () => {
        return (
            <div>
                <button onClick={() => {
                    dispatch(toggle())
                }}
                        id="rainbow-button"
                        className={'nnn-button'}
                >
                    {children}
                </button>
                <br/>
                {hellState && (
                    <select value={selectedMusic} onChange={handleMusicSelection}>
                        <option value="">Select Music</option>
                        <option value="lo-fi">Lo-fi</option>
                        <option value="nyan-cat">Nyan Cat Soundtrack</option>
                        <option value="rain">Rain</option>
                        <option value="synth">Synthwave</option>
                    </select>
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
                        url="http://streamingp.shoutcast.com/JamendoLounge?lang=en-US%2cen%3bq%3d0.5"
                        playing={true}
                        loop={true}
                        width={0}
                        height={0}
                    />
                )}
            </div>)
    }
    return (
        <ElToReturn/>
    );
};

export const ImageCarousel = () => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const apiFunctions = {
                shibe: fetchShibeApiImages,
                neko: fetchNekoApiImages,
                animality: fetchAnimalityApiImages,
                purrbot: fetchPurrBotApiImages,
                default: fetchCatApiImages,
            };

            const curApi = document.cookie.replace(
                /(?:(?:^|.*;\s*)api_val\s*\=\s*([^;]*).*$)|^.*$/,
                "$1",
            );

            const images = await (apiFunctions[curApi] || apiFunctions["default"])();

            setImages(images);
        } catch (error) {
            console.error("Error fetching images:", error);
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
            prevIndex === 0 ? images.length - 1 : prevIndex - 1,
        );
    };

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        const colorCookie = document.cookie.replace(
            /(?:(?:^|.*;\s*)color\s*\=\s*([^;]*).*$)|^.*$/,
            "$1",
        );
        const body = document.body;
        body.style.backgroundColor = colorCookie || "#ffdead";

        // Add the Konami code event listener
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

        function onKeyDown(e) {
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
                alert("Nyan! Pwease, wefwesh this page!");
                var endpoints = ["neko", "purrbot"];
                var plushVal = endpoints[Math.floor(Math.random() * endpoints.length)];
                document.cookie = `api_val=${plushVal}`;
                konamiCodePosition = 0;
            }
        }

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <div className="carousel">
            <Helmet>
                <link
                    rel="icon"
                    type="image/png"
                    href="https://cataas.com/cat/says/%20?width=100&height=100"
                />
            </Helmet>
            <MagicRainbowButton intervalDelay={1500}>
                <div>toggle death mode</div>
            </MagicRainbowButton>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : (
                images.length > 0 && (
                    <div className="image-container">
                        <img
                            id="cat-img"
                            src={images[currentImageIndex]}
                            alt="carousel-image"
                            className="carousel-image"
                            style={{objectFit: "cover", width: "100%", height: "100%"}}
                        />
                    </div>
                )
            )}
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
