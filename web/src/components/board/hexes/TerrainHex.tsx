import { TERRAIN_NAMES } from "../../../constants";
import { Coordinate, Hex } from "../../../types";
import Intersections from "../intersections/Intersections";
import Paths from "../paths/Paths";
import Token from "../tokens/Token";
import "./Hex.css";

export interface TerrainHexProps {
  hex: Hex;
  coordinate: Coordinate;
}

export default function TerrainHex({ hex }: TerrainHexProps) {
  return (
    <div className="hex-wrapper">
      <div className="hex hex-outer terrain">
        <div className={`hex hex-inner terrain-${hex.terrain}`}>
          <div className="hex-content">
            <div>{TERRAIN_NAMES[hex.terrain] || ""}</div>
            {hex.token > 0 ? <Token value={hex.token} /> : null}
          </div>
        </div>
      </div>
      <Paths />
      <Intersections />
    </div>
  );
}
