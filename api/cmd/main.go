package main

import (
	"os"
	"github.com/berlin-chat/berlin-chat/api/pkg/server"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server.Start(port)
}