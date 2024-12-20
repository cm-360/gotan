package game

type ResourceCard string

const (
	Brick   ResourceCard = "brick"
	Lumber  ResourceCard = "lumber"
	Ore     ResourceCard = "ore"
	Grain   ResourceCard = "grain"
	Wool    ResourceCard = "wool"
	Nothing ResourceCard = ""
)

type DevelopmentCard string

const (
	Knight DevelopmentCard = "knight"
	// Progress cards
	RoadBuilding DevelopmentCard = "progress_road_building"
	YearOfPlenty DevelopmentCard = "progress_year_of_plenty"
	Monopoly     DevelopmentCard = "progress_monopoly"
	// Victory point cards
	VictoryPointGeneric    DevelopmentCard = "victory_point_generic"
	VictoryPointChapel     DevelopmentCard = "victory_point_chapel"
	VictoryPointGreatHall  DevelopmentCard = "victory_point_great_hall"
	VictoryPointLibrary    DevelopmentCard = "victory_point_library"
	VictoryPointMarket     DevelopmentCard = "victory_point_market"
	VictoryPointUniversity DevelopmentCard = "victory_point_university"
)
