import { Link } from "react-router-dom";
import PrimaryButton from "../../buttons/PrimaryButton";
import SecondaryButton from "../../buttons/SecondaryButton";
import Modal from "../../modals/Modal";
import Menu from "../Menu";
import MenuHeader from "../MenuHeader";
import MenuSection from "../MenuSection";

export default function MainMenu() {
  return (
    <Modal>
      <div className="block-container">
        <Menu>
          <MenuHeader>
            <h1>Settlers of Gotan</h1>
          </MenuHeader>
          <MenuSection>
            <Link to="/join">
              <PrimaryButton>Join Game</PrimaryButton>
            </Link>
            <Link to="/create">
              <SecondaryButton>Create Game</SecondaryButton>
            </Link>
          </MenuSection>
        </Menu>
      </div>
    </Modal>
  );
}
