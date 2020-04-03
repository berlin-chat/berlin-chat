package database

import (
	"log"
	"os"
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func Bootstrap() {
	log.Println("Deleting sqlite-database.db...")
	os.Remove("/root/cmd/sqlite-database.db")

	log.Println("Creating sqlite-database.db...")
	file, err := os.Create("/root/cmd/sqlite-database.db")
	if err != nil {
		log.Fatal(err.Error())
	}
	file.Close()
	log.Println("sqlite-database.db was created")

	sqliteDatabase, _ := sql.Open("sqlite3", "/root/cmd/sqlite-database.db")
	defer sqliteDatabase.Close()

	createMessagesTableSQL := `CREATE TABLE messages (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"username" VARCHAR,
		"message" TEXT,
		"timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP
	  );`

	log.Println("Create messages table...")
	statement, err := sqliteDatabase.Prepare(createMessagesTableSQL) // Prepare SQL Statement
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec() // Execute SQL Statements
	log.Println("messages table was created")

	InsertMessage("Josef", "hi ihr heinis");
	InsertMessage("Thilo", "selber heini");
}

func Query(query string) (*sql.Rows, error) {
	sqliteDatabase, _ := sql.Open("sqlite3", "/root/cmd/sqlite-database.db")

	return sqliteDatabase.Query(query)
}

func InsertMessage(username string, message string) {
	sqliteDatabase, _ := sql.Open("sqlite3", "/root/cmd/sqlite-database.db")

	log.Println("Inserting message record ...")
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