package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("."))

	http.Handle("/", fs)

	port := ":8080"
	log.Printf("Villain server running at http://localhost%s/", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
