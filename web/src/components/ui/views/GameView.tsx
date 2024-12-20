import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { API_URL } from "../../../constants";
import { GameContext } from "../../../contexts/GameContext";
import { GameData } from "../../../types";
import { checkStatus } from "../../../utils";
import Board from "../../board/Board";

export default function GameView() {
  const match = useMatch("/play/:roomId");
  const gameId = match?.params.roomId;
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    if (!gameId) {
      return;
    }

    fetch(`${API_URL}/games/${gameId}`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setGameData(responseJson);
      })
      .catch(console.error);
  }, [gameId, setGameData]);

  if (!gameId || null === gameData) {
    return null;
  }

  const contextValue = {
    gameId,
    gameData: gameData,
  };

  return (
    <GameContext.Provider value={contextValue}>
      <Board board={gameData.board} />
    </GameContext.Provider>
  );
}
