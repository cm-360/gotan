package game

type Player struct {
	Name  string `json:"name"`
	Color string `json:"color"`
	// Cards
	ResourceCards    []ResourceCard    `json:"resource_cards"`
	DevelopmentCards []DevelopmentCard `json:"development_cards"`
	// Pieces
	Settlements int `json:"settlements"`
	Cities      int `json:"cities"`
	Roads       int `json:"roads"`
}
