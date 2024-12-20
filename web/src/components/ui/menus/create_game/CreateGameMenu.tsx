import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../constants";
import { checkStatus, fetchWithJson } from "../../../../utils";
import PrimaryButton from "../../buttons/PrimaryButton";
import Modal from "../../modals/Modal";
import Menu from "../Menu";
import MenuHeader from "../MenuHeader";
import MenuSection from "../MenuSection";

export default function CreateGameMenu() {
  const navigate = useNavigate();

  const createGame = useCallback(() => {
    fetchWithJson(
      `${API_URL}/games`,
      { ruleset_filename: "original.json" },
      { method: "POST" }
    )
      .then(checkStatus)
      .then((response) => response.json())
      .then((responseJson) => {
        const gameId = responseJson["game_id"];
        navigate(`/join/${gameId}`);
      })
      .catch(console.error);
  }, [navigate]);

  return (
    <Modal>
      <Menu>
        <MenuHeader>
          <h1>Create Game</h1>
        </MenuHeader>
        <MenuSection>
          <PrimaryButton onClick={createGame}>Create</PrimaryButton>
        </MenuSection>
      </Menu>
    </Modal>
  );
}
