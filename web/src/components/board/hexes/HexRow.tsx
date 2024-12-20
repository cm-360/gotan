import { Hex } from "../Board";
import SpacerHex from "../hexes/SpacerHex";
import TerrainHex from "../hexes/TerrainHex";
import "./HexRow.css";

export interface HexRowProps {
  row: Hex[];
  rowIndex: number;
}

export default function HexRow({ row, rowIndex }: HexRowProps) {
  const hexes = row.map((hex, colIndex) => {
    if (null === hex) {
      return <SpacerHex key={`blank-${colIndex}`} />;
    } else {
      const q = colIndex - Math.floor(rowIndex / 2) + 1;

      return (
        <TerrainHex
          key={`terrain-${colIndex}`}
          hex={hex}
          coordinate={{ q: q, r: rowIndex }}
        />
      );
    }
  });

  return <div className="hex-row">{hexes}</div>;
}
