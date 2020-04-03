package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
)

type Message struct {
	Username	string
	Message		string
}

type Messages []Message

func main() {
	messages := Messages{
		Message{Username: "Josef", Message: "hi ihr heinis"},
		Message{Username: "Thilo", Message: "selber heini"},
	}

	http.HandleFunc("/message", func(w http.ResponseWriter, r *http.Request) {
		var message Message
		if r.Method == "POST" {
			json.NewDecoder(r.Body).Decode(&message)
		}
		fmt.Println(message)
		messages = append(messages, message)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			json.NewEncoder(w).Encode(messages)
		}
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}