import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import { GameData } from "./types";
import { API_URL } from "./constants";

export default function App() {
  const [gameId, setGameId] = useState("");
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/games`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ruleset_filename: "original.json" }),
    })
      .then((response) => response.json())
      .then((responseJson) => setGameId(responseJson["game_id"]));
  }, [setGameId]);

  useEffect(() => {
    if (!gameId.length) {
      return;
    }

    fetch(`${API_URL}/games/${gameId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setGameData(responseJson);
      });
  }, [gameId, setGameData]);

  if (null === gameData) {
    return null;
  }

  return (
    <main>
      <Board board={gameData.board} />
    </main>
  );
}
