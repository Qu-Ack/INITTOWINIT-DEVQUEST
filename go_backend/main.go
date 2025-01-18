package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/Qu-Ack/iitjodhpur/go_backend/internal/auth"
	"github.com/Qu-Ack/iitjodhpur/go_backend/internal/database"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type state struct {
	DB *mongo.Database
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("no env")
	}
	auth.Init()
	client := database.ConnectDB()

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	database := client.Database("iitjodhpur")

	_, err = database.Collection("users").Indexes().CreateOne(
		context.Background(),
		mongo.IndexModel{
			Keys: bson.D{
				{"UserID", 1}, // Index on "invite"
			},
			Options: options.Index().SetUnique(true), // Set the index to be unique
		},
	)

	if err != nil {
		log.Fatal("index cannot be set")
	}

	state := state{
		DB: database,
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://example.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	router.GET("/auth/google/start", state.BeginGoogleAuth)
	router.GET("auth/google/callback", state.OAuthCallback)
	router.GET("/upload/s3url", SessionMiddleware(), HandleGetS3Url)
	router.GET("/user/:userid", SessionMiddleware(), state.handleGetUser)
	router.PUT("/user/:userid/image", SessionMiddleware(), state.handlePushImage)

	router.POST("/report", SessionMiddleware(), state.handlePostReport)
	router.GET("/report/:reportid", SessionMiddleware(), state.handleGetReport)

	router.Run()

}
