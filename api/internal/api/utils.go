package api

import (
	"encoding/json"
	"net/http"
)

type JsonErrorResponse struct {
	Message string `json:"message"`
}

func SetCorsHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func WriteError(w http.ResponseWriter, status int, message string) {
	w.WriteHeader(status)
	WriteJson(w, JsonErrorResponse{Message: message})
}

func WriteJson(w http.ResponseWriter, data any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
