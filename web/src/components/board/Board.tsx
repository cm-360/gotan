import { useCallback, useEffect, useState } from "react";
import "./Board.css";
import HexRow from "./hexes/HexRow";
import ClipPaths from "./ClipPaths";

export interface Board {
  width: number;
  height: number;
  hexes: Hex[][];
}

export interface Hex {
  terrain: string;
  token: number;
}

export default function Board() {
  const [boardData, setBoardData] = useState<Board | null>(null);

  const [dragging, setDragging] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prevMouseX, setPrevMouseX] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prevMouseY, setPrevMouseY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3333/board`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setBoardData(responseJson);
      });
  }, [setBoardData]);

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      setDragging(true);
      setPrevMouseX(event.clientX);
      setPrevMouseY(event.clientY);
    },
    [setPrevMouseX, setPrevMouseY]
  );

  const onMouseMove = useCallback(
    (event: MouseEvent, dragging: boolean) => {
      event.preventDefault();

      if (!dragging) return;

      setPrevMouseX((oldMouseX) => {
        setOffsetX(
          (oldOffsetX) => oldOffsetX - 0.5 * (oldMouseX - event.clientX)
        );
        return event.clientX;
      });
      setPrevMouseY((oldMouseY) => {
        setOffsetY(
          (oldOffsetY) => oldOffsetY - 0.5 * (oldMouseY - event.clientY)
        );
        return event.clientY;
      });
    },
    [setOffsetX, setOffsetY]
  );

  const onMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    const mouseMoveListener = (e: MouseEvent) => onMouseMove(e, dragging);

    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, onMouseMove, onMouseUp]);

  if (!boardData) {
    return <></>;
  }

  const hexRows = transformBoard(boardData).hexes.map((row, rowIndex) => (
    <HexRow key={rowIndex} row={row} rowIndex={rowIndex} />
  ));

  return (
    <div className="board" onMouseDown={onMouseDown}>
      <ClipPaths />
      <div className="hex-grid" style={{ left: offsetX, top: offsetY }}>
        {hexRows}
      </div>
    </div>
  );
}

function transformBoard(board: Board): Board {
  // Determine spacer count needed for each row
  const spacerCounts = board.hexes.map((row, rowIndex) => {
    const leadingNullCount = row.findIndex((hex) => hex !== null);
    const indentCount = Math.floor(rowIndex / 2);

    return leadingNullCount + indentCount;
  });

  // Remove largest full slice of spacers from leading edge
  const spacerTrimCount = spacerCounts.reduce(
    (min, count) => Math.min(min, count),
    Infinity
  );

  // Update rows to include only necessary spacers
  const hexRows = board.hexes.map((row, rowIndex) => {
    const filteredRow = row.filter((hex) => hex !== null);
    const spacerCount = spacerCounts[rowIndex] - spacerTrimCount;
    const nullSpacers = new Array(spacerCount).fill(null);

    return [...nullSpacers, ...filteredRow];
  });

  return { ...board, hexes: hexRows };
}
