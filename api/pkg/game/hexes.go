package game

// https://www.redblobgames.com/grids/parts/#hexagon-relationships

type Coordinate struct {
	Q int
	R int
}

// Hexes (tiles)

type Terrain string

const (
	Hills     Terrain = "hills"
	Forest    Terrain = "forest"
	Mountains Terrain = "mountains"
	Fields    Terrain = "fields"
	Pasture   Terrain = "pasture"
	Desert    Terrain = "desert"
)

type Hex struct {
	Terrain Terrain `json:"terrain"`
	Token   int     `json:"token"`
}

func (terrain Terrain) GetProducedResource() ResourceCard {
	switch terrain {
	case Hills:
		return Brick
	case Forest:
		return Lumber
	case Mountains:
		return Ore
	case Fields:
		return Grain
	case Pasture:
		return Wool
	default:
		return Nothing
	}
}

// Neighbors

func GetNeighbors(c Coordinate) []Coordinate {
	return []Coordinate{
		{c.Q, c.R + 1},
		{c.Q + 1, c.R},
		{c.Q + 1, c.R - 1},
		{c.Q, c.R - 1},
		{c.Q - 1, c.R},
		{c.Q - 1, c.R + 1},
	}
}

// Paths (borders)

type PathDirection int

const (
	NE PathDirection = iota
	NW
	W
)

type Path struct {
	Coordinate Coordinate
	Direction  PathDirection
}

func GetBorders(c Coordinate) []Path {
	return []Path{
		{Coordinate{c.Q, c.R}, NE},
		{Coordinate{c.Q, c.R}, NW},
		{Coordinate{c.Q, c.R}, W},
		{Coordinate{c.Q - 1, c.R + 1}, NE},
		{Coordinate{c.Q, c.R + 1}, NW},
		{Coordinate{c.Q + 1, c.R}, W},
	}
}

// Intersections (corners)

type IntersectionDirection int

const (
	N IntersectionDirection = iota
	S
)

type Intersection struct {
	Coordinate Coordinate
	Direction  IntersectionDirection
}

func GetCorners(c Coordinate) []Intersection {
	return []Intersection{
		{Coordinate{c.Q, c.R}, N},
		{Coordinate{c.Q, c.R - 1}, S},
		{Coordinate{c.Q - 1, c.R + 1}, N},
		{Coordinate{c.Q, c.R}, S},
		{Coordinate{c.Q, c.R + 1}, N},
		{Coordinate{c.Q + 1, c.R - 1}, S},
	}
}
