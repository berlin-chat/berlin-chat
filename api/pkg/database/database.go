package database

import (
	"log"
	"os"
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func Bootstrap() {
	log.Println("Deleting database...")
	os.Remove("/root/data/database.sqlite")

	log.Println("Creating database...")
	file, err := os.Create("/root/data/database.sqlite")
	if err != nil {
		log.Fatal(err.Error())
	}
	file.Close()
	log.Println("database was created")

	sqliteDatabase, _ := sql.Open("sqlite3", "/root/data/database.sqlite")
	defer sqliteDatabase.Close()

	createMessagesTableSQL := `CREATE TABLE messages (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"username" VARCHAR,
		"message" TEXT,
		"timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP
	  );`

	log.Println("Create messages table...")
	statement, err := sqliteDatabase.Prepare(createMessagesTableSQL)
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec()
	log.Println("messages table was created")
}

func Query(query string) (*sql.Rows, error) {
	sqliteDatabase, _ := sql.Open("sqlite3", "/root/data/database.sqlite")

	return sqliteDatabase.Query(query)
}

func InsertMessage(username string, message string) {
	sqliteDatabase, _ := sql.Open("sqlite3", "/root/data/database.sqlite")

	log.Println("Inserting message record for user >>", username, "<<")
	insertMessagesSQL := `INSERT INTO messages(username, message) VALUES (?, ?)`
	statement, err := sqliteDatabase.Prepare(insertMessagesSQL) // Prepare statement. This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(username, message)
	if err != nil {
		log.Fatalln(err.Error())
	}
}