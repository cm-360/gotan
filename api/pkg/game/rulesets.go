package game

import (
	"fmt"
)

// https://www.catan.com/understand-catan/game-rules

type Ruleset struct {
	// Board size
	BoardWidth  int `json:"board_width"`
	BoardHeight int `json:"board_height"`
	// Terrain
	TerrainCounts map[Terrain]int `json:"terrain_counts"`
	TokenCounts   map[int]int     `json:"token_counts"`
	// TODO harbors
	// Cards
	ResourceCardCounts    map[ResourceCard]int    `json:"resource_card_counts"`
	DevelopmentCardCounts map[DevelopmentCard]int `json:"development_card_counts"`
	// Players
	MinPlayers int       `json:"min_players"`
	MaxPlayers int       `json:"max_players"`
	PerPlayer  PerPlayer `json:"per_player"`
	// Other options
	RobberCount            int         `json:"robber_count"`
	AllowRedTokenNeighbors bool        `json:"allow_red_token_neighbors"`
	OnlyStarterProduces    bool        `json:"only_starter_produces"`
	PointValues            PointValues `json:"point_values"`
}

type PerPlayer struct {
	Cities      int `json:"cities"`
	Settlements int `json:"settlements"`
	Roads       int `json:"roads"`
}

type PointValues struct {
	Settlement       int `json:"settlement"`
	City             int `json:"city"`
	LongestRoadCard  int `json:"longest_road_card"`
	LargestArmyCard  int `json:"largest_army_card"`
	VictoryPointCard int `json:"victory_point_card"`
}

func (ruleset *Ruleset) Validate() error {
	// Board size
	if ruleset.BoardWidth < 0 || ruleset.BoardHeight < 0 {
		return fmt.Errorf("invalid board size")
	}

	boardArraySize := ruleset.BoardWidth * ruleset.BoardHeight

	// TODO calculate correct trim count
	landHexCount := boardArraySize - 12
	if landHexCount < 0 {

	}

	// Robber count
	if ruleset.RobberCount <= 0 {
		return fmt.Errorf("invalid robber count: must be greater than 0")
	}
	if ruleset.RobberCount > ruleset.TerrainCounts["desert"] {
		return fmt.Errorf("invalid robber count: cannot exceed number of desert hexes")
	}

	return nil
}
