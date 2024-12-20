package game

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
)

type Game struct {
	Ruleset *Ruleset
	Board   *Board
	Players []*Player
	// TODO: game state
}

func NewGame(rulesetFilename string) (*Game, error) {
	ruleset, err := loadRuleset(rulesetFilename)
	if err != nil {
		return nil, err
	}

	err = ruleset.Validate()
	if err != nil {
		return nil, fmt.Errorf("ruleset validation failed: %w", err)
	}

	board := NewBoard(ruleset.BoardWidth, ruleset.BoardHeight)
	placeHexes(ruleset, board)
	placeTokens(ruleset, board)

	return &Game{ruleset, board, []*Player{}}, nil
}

func loadRuleset(filename string) (*Ruleset, error) {
	jsonFile, err := os.ReadFile(filename)
	if err != nil {
		return nil, fmt.Errorf("failed to read ruleset: %w", err)
	}

	var ruleset Ruleset
	err = json.Unmarshal(jsonFile, &ruleset)
	if err != nil {
		return nil, fmt.Errorf("failed to parse ruleset: %w", err)
	}

	return &ruleset, nil
}

func placeHexes(ruleset *Ruleset, board *Board) {
	var hexes []Terrain
	for terrain, count := range ruleset.TerrainCounts {
		for i := 0; i < count; i++ {
			hexes = append(hexes, terrain)
		}
	}

	hexOrder := rand.Perm(len(hexes))

	hexIndex := 0
	for r := 0; r < board.Height; r++ {
		for q := 0; q < board.Width; q++ {
			if (!board.IsInBounds(Coordinate{q, r})) {
				continue
			}

			board.Hexes[r][q] = &Hex{
				Terrain: hexes[hexOrder[hexIndex]],
			}
			hexIndex++
		}
	}
}

func placeTokens(ruleset *Ruleset, board *Board) {
	var tokens []int
	for token, count := range ruleset.TokenCounts {
		for i := 0; i < count; i++ {
			tokens = append(tokens, token)
		}
	}

	tokenOrder := rand.Perm(len(tokens))

	tokenIndex := 0
	for r := 0; r < board.Height; r++ {
		for q := 0; q < board.Width; q++ {
			if (!board.IsInBounds(Coordinate{q, r})) {
				continue
			}

			hex := board.Hexes[r][q]

			if hex.Terrain == Desert {
				continue
			}

			hex.Token = tokens[tokenOrder[tokenIndex]]
			tokenIndex++
		}
	}
}
