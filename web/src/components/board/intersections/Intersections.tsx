import { Hex } from "../../../types";
import "./Intersections.css";

export interface IntersectionsProps {
  hex: Hex;
}

export default function Intersections() {
  const showN = true;
  const showS = true;

  return (
    <div className="intersections">
      {showN ? (
        <div className="intersection intersection-n selectable"></div>
      ) : null}
      {showS ? (
        <div className="intersection intersection-s selectable"></div>
      ) : null}
    </div>
  );
}
