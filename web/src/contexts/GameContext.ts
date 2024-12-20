import { createContext, useContext } from "react";
import { GameData } from "../types";

export interface GameContextType {
  gameId: string;
  gameData: GameData;
}

export const GameContext = createContext<GameContextType | null>(null);
export const useGameContext = () => useContext(GameContext) as GameContextType;
