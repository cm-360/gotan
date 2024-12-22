package api

import (
	"encoding/json"
	"fmt"
	"maps"
	"math/rand"
	"net/http"
	"path"
	"strings"

	gotan "cm360.xyz/gotan-api/pkg/game"
)

const gameIdChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const gameIdLength = 6 // TODO: make configurable

type createGameRequest struct {
	RulesetFilename string `json:"ruleset_filename"`
}

type createGameResponse struct {
	GameId string `json:"game_id"`
}

type getGameResponse struct {
	Ruleset *gotan.Ruleset `json:"ruleset"`
	Board   *gotan.Board   `json:"board"`
	// TODO: mask player data
	Players []*gotan.Player `json:"players"`
}

func HandleListGames(w http.ResponseWriter, r *http.Request) {
	SetCorsHeaders(w)

	ServerState.Mutex.Lock()
	defer ServerState.Mutex.Unlock()

	WriteJson(w, maps.Keys(ServerState.Games))
}

func HandleCreateGame(w http.ResponseWriter, r *http.Request) {
	SetCorsHeaders(w)

	var reqData createGameRequest
	err := json.NewDecoder(r.Body).Decode(&reqData)
	if err != nil {
		message := fmt.Sprintf("Error parsing request: %s", err)
		WriteError(w, http.StatusBadRequest, message)
		return
	}

	// TODO: protect against path traversal
	newGame, err := gotan.NewGame(path.Join("./rulesets", reqData.RulesetFilename))
	if err != nil {
		message := fmt.Sprintf("Failed to create game: %s", err)
		WriteError(w, http.StatusInternalServerError, message)
		return
	}

	ServerState.Mutex.Lock()
	defer ServerState.Mutex.Unlock()

	var gameId string
	for {
		gameId = generateGameId(gameIdLength)
		_, exists := ServerState.Games[gameId]
		if !exists {
			break
		}
	}

	ServerState.Games[gameId] = newGame
	WriteJson(w, createGameResponse{GameId: gameId})
}

func HandleDeleteGame(w http.ResponseWriter, r *http.Request) {
	SetCorsHeaders(w)

	gameId := strings.ToUpper(r.PathValue("game_id"))
	if len(gameId) == 0 {
		message := "Missing required parameter: game_id"
		WriteError(w, http.StatusBadRequest, message)
		return
	}

	ServerState.Mutex.Lock()
	defer ServerState.Mutex.Unlock()

	_, exists := ServerState.Games[gameId]
	if !exists {
		message := fmt.Sprintf("Unrecognized game ID: %s", gameId)
		WriteError(w, http.StatusNotFound, message)
		return
	}

	delete(ServerState.Games, gameId)
	w.WriteHeader(http.StatusNoContent)
}

func HandleGetGame(w http.ResponseWriter, r *http.Request) {
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

	response := getGameResponse{
		Ruleset: game.Ruleset,
		Board:   game.Board,
		Players: game.Players,
	}
	WriteJson(w, response)
}

func generateGameId(length int) string {
	result := make([]byte, length)
	for i := range length {
		result[i] = gameIdChars[rand.Intn(len(gameIdChars))]
	}
	return string(result)
}
