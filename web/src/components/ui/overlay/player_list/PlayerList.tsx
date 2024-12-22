import { Player } from "../../../../types";
import "./PlayerList.css";
import PlayerListItem from "./PlayerListItem";

export interface PlayerListProps {
  players: Player[];
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <aside className="player-list">
      {players.map((player) => (
        <PlayerListItem player={player} />
      ))}
    </aside>
  );
}
