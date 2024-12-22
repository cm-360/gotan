import { Player } from "../../../../types";
import Card from "../../../cards/Card";

export interface PlayerListItemProps {
  player: Player;
}

// Consider for icons: https://github.com/laurentpayot/minidenticons

export default function PlayerListItem({ player }: PlayerListItemProps) {
  return (
    <div className="player-list-item block-container">
      <div className="player-name">
        <div style={{ color: player.color }}>{player.name}</div>
      </div>
      <div className="player-cards">
        <div className="numbered">
          <Card>Res</Card>
          <div>{player.resource_cards.length}</div>
        </div>
        <div className="numbered">
          <Card>Dev</Card>
          <div>{player.development_cards.length}</div>
        </div>
      </div>
    </div>
  );
}
