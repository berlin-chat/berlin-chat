package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"

	"os"
	"database/sql"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

type Message struct {
	Username	string
	Message		string
}

type Messages []Message

func main() {
	os.Remove("/root/cmd/sqlite-database.db") // I delete the file to avoid duplicated records. SQLite is a file based database.

	log.Println("Creating sqlite-database.db...")
	file, err := os.Create("/root/cmd/sqlite-database.db") // Create SQLite file
	if err != nil {
		log.Fatal(err.Error())
	}
	file.Close()
	log.Println("sqlite-database.db created")

	sqliteDatabase, _ := sql.Open("sqlite3", "/root/cmd/sqlite-database.db")
	defer sqliteDatabase.Close() // Defer Closing the database

	createMessagesTableSQL := `CREATE TABLE messages (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"username" VARCHAR,
		"message" TEXT
	  );` // SQL Statement for Create Table

	log.Println("Create messages table...")
	statement, err := sqliteDatabase.Prepare(createMessagesTableSQL) // Prepare SQL Statement
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec() // Execute SQL Statements
	log.Println("messages table created")

	insertMessage(sqliteDatabase, "Josef", "hi ihr heinis");
	insertMessage(sqliteDatabase, "Thilo", "selber heini");





	http.HandleFunc("/message", func(w http.ResponseWriter, r *http.Request) {
		var message Message
		if r.Method == "POST" {
			json.NewDecoder(r.Body).Decode(&message)
		}
		fmt.Println(message)
		insertMessage(sqliteDatabase, message.Username, message.Message)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		messages := []Message{}

		rows, err := sqliteDatabase.Query("SELECT username, message FROM messages ORDER BY id")
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()
		for rows.Next() { // Iterate and fetch the records from result cursor
			var message Message
			err = rows.Scan(&message.Username, &message.Message)
			if err != nil {
				log.Fatalf("Scan: %v", err)
			}
			messages = append(messages, message)
			//var id int
			//var code string
			//var name string
			//var program string
			//row.Scan(&id, &code, &name, &program)
			//log.Println("Student: ", code, " ", name, " ", program)
		}

		if r.Method == "GET" {
			json.NewEncoder(w).Encode(messages)
		}
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func insertMessage(db *sql.DB, username string, message string) {
	log.Println("Inserting message record ...")
	insertMessagesSQL := `INSERT INTO messages(username, message) VALUES (?, ?)`
	statement, err := db.Prepare(insertMessagesSQL) // Prepare statement. This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(username, message)
	if err != nil {
		log.Fatalln(err.Error())
	}
}