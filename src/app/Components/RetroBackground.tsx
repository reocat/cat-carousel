import React from "react";

/**
 * Hand-built synthwave scene that replaces retro-bg.webm: indigo sky,
 * striped retro sun, scrolling perspective grid and a hint of CRT scanlines.
 * Palette lifted from the original video frames.
 */
const RetroBackground: React.FC = () => {
  return (
    <div className="retro-bg" aria-hidden="true">
      <svg className="retro-stars" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        {[
          [120, 90, 1.2, 0], [310, 160, 0.9, 0.4], [540, 60, 1.4, 0.8],
          [760, 130, 1.0, 0.2], [980, 70, 1.5, 0.6], [1210, 170, 0.8, 0.9],
          [1420, 100, 1.3, 0.3], [220, 300, 1.0, 0.5], [620, 260, 1.2, 0.1],
          [1060, 310, 0.9, 0.7], [1380, 280, 1.1, 0.35],
        ].map(([x, y, s, d], i) => (
          <path
            key={i}
            className="bg-twinkle"
            style={{ animationDelay: `${d}s` }}
            transform={`translate(${x} ${y}) scale(${s})`}
            d="M0 -2.2 L0.65 -0.65 L2.2 0 L0.65 0.65 L0 2.2 L-0.65 0.65 L-2.2 0 L-0.65 -0.65 Z"
          />
        ))}
      </svg>

      <div className="retro-sun-glow" />
      <div className="retro-sun" />
      <div className="retro-horizon" />
      <div className="retro-grid" />
      <div className="retro-scanlines" />
    </div>
  );
};

export default RetroBackground;
