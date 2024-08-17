import React from "react";

interface BackgroundVideoProps {
  src: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src }) => {
  return (
    <video autoPlay loop muted playsInline className="background-video">
      <source src={src} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
