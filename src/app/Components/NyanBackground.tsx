/**
 * Nyan scene, faithful to the original webm: a staggered field of small nyan
 * cats tiled across a white sky. The tile is the classic self-animating SVG
 * kanged from https://github.com/Gowee/nyancat-svg (cat frames originally from
 * iliana's html5nyancat) — its internal keyframes animate inside every tile.
 * Kang'd for now — we can redraw or restyle it later, nya~
 */
const NyanBackground: React.FC = () => {
  return (
    <div className="nyan-bg" aria-hidden="true">
      <div className="nyan-cat-field" />
    </div>
  );
};

export default NyanBackground;
