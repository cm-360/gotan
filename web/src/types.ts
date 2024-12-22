export interface GameData {
  ruleset: never;
  board: BoardData;
  players: Player[];
}

// Board

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

// Players

export interface Player {
  name: string;
  color: string;
  // Cards
  resource_cards: ResourceCard[];
  development_cards: DevelopmentCard[];
  // Pieces
  settlements: number;
  cities: number;
  roads: number;
}

// Cards

export enum ResourceCard {
  Brick = "brick",
  Lumber = "lumber",
  Ore = "ore",
  Grain = "grain",
  Wool = "wool",
  Nothing = "",
}

export enum DevelopmentCard {
  Knight = "knight",
  // Progress cards
  RoadBuilding = "progress_road_building",
  YearOfPlenty = "progress_year_of_plenty",
  Monopoly = "progress_monopoly",
  // Victory point cards
  VictoryPointGeneric = "victory_point_generic",
  VictoryPointChapel = "victory_point_chapel",
  VictoryPointGreatHall = "victory_point_great_hall",
  VictoryPointLibrary = "victory_point_library",
  VictoryPointMarket = "victory_point_market",
  VictoryPointUniversity = "victory_point_university",
}
