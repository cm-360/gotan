import { useCallback, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { API_URL } from "../../../../constants";
import { checkStatus, fetchWithJson } from "../../../../utils";
import PrimaryButton from "../../buttons/PrimaryButton";
import Modal from "../../modals/Modal";
import Menu from "../Menu";
import MenuHeader from "../MenuHeader";
import MenuSection from "../MenuSection";

export default function JoinGameMenu() {
  const navigate = useNavigate();

  const match = useMatch("/join/:gameId");
  const [gameId, setGameId] = useState(match?.params.gameId || "");
  const [username, setUsername] = useState("");

  const joinGame = useCallback(
    (gameId: string, username: string) => {
      fetchWithJson(
        `${API_URL}/games/${gameId}/players`,
        { username },
        { method: "POST" }
      )
        .then(checkStatus)
        // .then((response) => response.json())
        .then(() => {
          // TODO: allow duplicate players
          navigate(`/play/${gameId}`);
        })
        .catch(console.error);
    },
    [navigate]
  );

  const onSubmit = useCallback(
    (event: React.FormEvent, gameId: string, username: string) => {
      event.preventDefault();
      joinGame(gameId, username);
    },
    [joinGame]
  );

  return (
    <Modal>
      <Menu>
        <MenuHeader>
          <h1>Join Game</h1>
        </MenuHeader>
        <MenuSection>
          <form
            id="join_game_form"
            onSubmit={(e) => onSubmit(e, gameId, username)}
          >
            <label htmlFor="game_id_input">Game ID</label>
            <input
              id="game_id_input"
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.currentTarget.value)}
            />
            <label htmlFor="username_input">Username</label>
            <input
              id="username_input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <PrimaryButton>Join</PrimaryButton>
          </form>
        </MenuSection>
      </Menu>
    </Modal>
  );
}
