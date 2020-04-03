package server

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"time"

	"github.com/berlin-chat/berlin-chat/api/pkg/database"
)

type Message struct {
	ID			int32
	Username	string
	Message		string
	Timestamp	time.Time
}

func Start(port string) {
	database.Bootstrap()

	http.HandleFunc("/message", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")

		var message Message
		if r.Method == "POST" {
			json.NewDecoder(r.Body).Decode(&message)
		}
		fmt.Println(message)
		database.InsertMessage(message.Username, message.Message)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")

		messages := []Message{}

		rows, err := database.Query("SELECT id, username, message, timestamp FROM messages ORDER BY id")
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()
		for rows.Next() {
			var message Message
			err = rows.Scan(&message.ID, &message.Username, &message.Message, &message.Timestamp)
			if err != nil {
				log.Fatalf("Scan: %v", err)
			}
			messages = append(messages, message)
		}

		if r.Method == "GET" {
			json.NewEncoder(w).Encode(messages)
		}
	})

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
