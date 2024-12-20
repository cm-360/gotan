export interface GameData {
  board: BoardData;
}

export interface BoardData {
  width: number;
  height: number;
  hexes: Hex[][];
}

export interface Hex {
  terrain: string;
  token: number;
}

export interface Coordinate {
  q: number;
  r: number;
}
