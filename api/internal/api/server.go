package api

import (
	"log"
	"net/http"
	"sync"

	gotan "cm360.xyz/gotan-api/pkg/game"
)

type ServerStateType struct {
	Mutex sync.Mutex
	Games map[string]*gotan.Game
}

var ServerState ServerStateType

func SpawnServer() {
	mux := http.NewServeMux()

	mux.HandleFunc(("GET /games"), HandleListGames)
	mux.HandleFunc(("POST /games"), HandleCreateGame)
	mux.HandleFunc(("DELETE /games/{game_id}"), HandleDeleteGame)
	mux.HandleFunc(("GET /games/{game_id}"), HandleGetGame)

	mux.HandleFunc("GET /games/{game_id}/players", HandleListPlayers)
	mux.HandleFunc("POST /games/{game_id}/players", HandleAddPlayer)
	mux.HandleFunc("DELETE /games/{game_id}/players/{player_name}", HandleRemovePlayer)

	err := http.ListenAndServe(":3333", mux)
	if err != nil {
		log.Fatal("Error serving HTTP:", err)
	}
}
