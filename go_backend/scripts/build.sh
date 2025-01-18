#!/bin/sh

# Build the Go application
go build -o main .

# Run the application (this is optional if you want it to start immediately in the container)
./main
