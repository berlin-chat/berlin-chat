package main

import (
	"flag"

	"github.com/berlin-chat/berlin-chat/api/pkg/server"
)

func main() {
	var port string

	flag.StringVar(&port, "p", "80", "Port the server listens on")
	flag.Parse()

	server.Start(port)
}
