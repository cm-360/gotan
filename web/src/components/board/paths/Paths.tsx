import { Hex } from "../Board";
import "./Paths.css";

export interface PathsProps {
  hex: Hex;
}

export default function Paths() {
  const showNE = true;
  const showNW = true;
  const showW = true;

  return (
    <div className="paths">
      {showNE ? <div className="path path-ne selectable"></div> : null}
      {showNW ? <div className="path path-nw road"></div> : null}
      {showW ? <div className="path path-w road"></div> : null}
    </div>
  );
}
