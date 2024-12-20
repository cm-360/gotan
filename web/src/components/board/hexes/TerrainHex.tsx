import { Hex } from "../Board";
import Intersections from "../intersections/Intersections";
import Paths from "../paths/Paths";
import Token from "../tokens/Token";
import "./Hex.css";

export interface Coordinate {
  q: number;
  r: number;
}

export interface TerrainHexProps {
  hex: Hex;
  coordinate: Coordinate;
}

export default function TerrainHex({ hex }: TerrainHexProps) {
  return (
    <div className="hex-wrapper">
      <div className="hex hex-outer terrain">
        <div className={"hex hex-inner terrain-" + hex.terrain}>
          <div className="hex-content">
            <div>{terrainName(hex.terrain)}</div>
            {hex.token > 0 ? <Token value={hex.token} /> : null}
          </div>
        </div>
      </div>
      <Paths />
      <Intersections />
    </div>
  );
}

function terrainName(terrainId: string): string {
  switch (terrainId) {
    case "hills":
      return "Hills";
    case "forest":
      return "Forest";
    case "mountains":
      return "Mountains";
    case "fields":
      return "Fields";
    case "pasture":
      return "Pasture";
    case "desert":
      return "Desert";
    default:
      return "";
  }
}
