package game

type Player struct {
	Name  string
	Color string
	// Cards
	ResourceCards    []ResourceCard
	DevelopmentCards []DevelopmentCard
	// Pieces
	Settlements int
	Cities      int
	Roads       int
}
