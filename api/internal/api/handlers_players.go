package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	gotan "cm360.xyz/gotan-api/pkg/game"
)

type addPlayerRequest struct {
	Name string `json:"name"`
}

func HandleListPlayers(w http.ResponseWriter, r *http.Request) {
	SetCorsHeaders(w)

	gameId := strings.ToUpper(r.PathValue("game_id"))
	if len(gameId) == 0 {
		message := "Missing required parameter: game_id"
		WriteError(w, http.StatusBadRequest, message)
		return
	}

	ServerState.Mutex.Lock()
	defer ServerState.Mutex.Unlock()

	game, exists := ServerState.Games[gameId]
	if !exists {
		message := fmt.Sprintf("Unrecognized game ID: %s", gameId)
		WriteError(w, http.StatusNotFound, message)
		return
	}

	// TODO send partial players
	WriteJson(w, game.Players)
}

func HandleAddPlayer(w http.ResponseWriter, r *http.Request) {
	SetCorsHeaders(w)

	gameId := strings.ToUpper(r.PathValue("game_id"))
	if len(gameId) == 0 {
		message := "Missing required parameter: game_id"
		WriteError(w, http.StatusBadRequest, message)
		return
	}

	var reqData addPlayerRequest
	err := json.NewDecoder(r.Body).Decode(&reqData)
	if err != nil {
		message := fmt.Sprintf("Error parsing request: %s", err)
		WriteError(w, http.StatusBadRequest, message)
		return
	}

	if len(reqData.Name) == 0 {
		message := "Missing required parameter: name"
		WriteError(w, http.StatusBadRequest, message)
		return
	}

	ServerState.Mutex.Lock()
	defer ServerState.Mutex.Unlock()

	game, exists := ServerState.Games[gameId]
	if !exists {
		message := fmt.Sprintf("Unrecognized game ID: %s", gameId)
		WriteError(w, http.StatusNotFound, message)
		return
	}

	// TODO auth for rejoin

	for i := 0; i < len(game.Players); i++ {
		if reqData.Name == game.Players[i].Name {
			message := fmt.Sprintf("Duplicate player name: %s", gameId)
			WriteError(w, http.StatusBadRequest, message)
			return
		}
	}

	newPlayer := &gotan.Player{
		Name:             reqData.Name,
		ResourceCards:    []gotan.ResourceCard{},
		DevelopmentCards: []gotan.DevelopmentCard{},
	}
	game.Players = append(game.Players, newPlayer)
	WriteJson(w, newPlayer)
}

func HandleRemovePlayer(w http.ResponseWriter, r *http.Request) {
	SetCorsHeaders(w)

	// TODO allow remove
}
