import { Player } from "../../../../types";

export interface PlayerListItemProps {
  player: Player;
}

export default function PlayerListItem({ player }: PlayerListItemProps) {
  return (
    <div>
      <div>{`Name: ${player.name}`}</div>
      <div>{`Color: ${player.color}`}</div>
      <div>{`R. Cards: ${JSON.stringify(player.resource_cards)}`}</div>
      <div>{`D. Cards: ${JSON.stringify(player.development_cards)}`}</div>
      <div>{`S: ${player.settlements}, C: ${player.cities}, R: ${player.roads}`}</div>
    </div>
  );
}
