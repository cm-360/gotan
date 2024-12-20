import "./ClipPaths.css";

export default function ClipPaths() {
  return (
    <div className="clip-paths">
      <svg width="0" height="0">
        <defs>
          {/* https://stackoverflow.com/a/31919429 */}
          <clipPath id="hexagon-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.5 0, 1 0.25, 1 0.75, 0.5 1, 0 0.75, 0, 0.25z" />
          </clipPath>
          {/* https://stackoverflow.com/a/37930426 */}
          <filter id="hexagon-dialate">
            <feMorphology operator="dilate" in="SourceGraphic" radius="5" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
