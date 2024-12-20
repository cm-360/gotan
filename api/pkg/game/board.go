package game

import (
	"fmt"
	"strings"
)

// "Pointy" orientation hex map using axial coordinates
// https://www.redblobgames.com/grids/hexagons/#map-storage

type Board struct {
	// Hex array
	Width  int      `json:"width"`
	Height int      `json:"height"`
	Hexes  [][]*Hex `json:"hexes"`
	// State
	Robbers []*Coordinate
}

func NewBoard(width int, height int) *Board {
	hexes := make([][]*Hex, height)
	for r := 0; r < height; r++ {
		hexes[r] = make([]*Hex, width)
	}

	return &Board{
		Width:  width,
		Height: height,
		Hexes:  hexes,
	}
}

func (board *Board) IsInBounds(coord Coordinate) bool {
	// TODO fix for non-squarelike boards
	trimSize := board.Width / 2

	// Trim top-left
	if coord.Q+coord.R < trimSize {
		return false
	}

	// Trim bottom-right
	if coord.Q+coord.R >= board.Width+trimSize {
		return false
	}

	return true
}

func (board *Board) Print() {
	for r := 0; r < board.Height; r++ {
		fmt.Printf("%s", strings.Repeat(" ", r))

		for q := 0; q < board.Width; q++ {
			hex := board.Hexes[r][q]
			if hex != nil {
				fmt.Printf("%s ", string(hex.Terrain[0]))
			} else {
				fmt.Print(". ")
			}
		}

		fmt.Printf("\n")
	}
}
