package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Qu-Ack/iitjodhpur/go_backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/gothic"
	"go.mongodb.org/mongo-driver/mongo"
)

func (s state) BeginGoogleAuth(c *gin.Context) {
	q := c.Request.URL.Query()
	q.Add("provider", "google")
	c.Request.URL.RawQuery = q.Encode()
	gothic.BeginAuthHandler(c.Writer, c.Request)
}

func (s state) OAuthCallback(c *gin.Context) {
	q := c.Request.URL.Query()
	q.Add("provider", "google")
	c.Request.URL.RawQuery = q.Encode()

	user, err := gothic.CompleteUserAuth(c.Writer, c.Request)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	images := make([]string, 0)
	userDoc := database.User{
		Name:   user.Name,
		Email:  user.Email,
		UserID: user.UserID,
		Images: images,
	}

	userCollection := s.DB.Collection("users")
	_, err = userCollection.InsertOne(c.Request.Context(), userDoc)

	if mongo.IsDuplicateKeyError(err) {
		log.Println("Duplicate user, skipping insertion")
	} else if err != nil {
		log.Println("Error inserting user:", err)
	}

	session, err := gothic.Store.New(c.Request, "mysession")
	if err != nil {
		log.Println("Error creating session:", err)
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	session.Values["user"] = user.UserID
	if err := session.Save(c.Request, c.Writer); err != nil {
		log.Println("Error saving session:", err)
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	// Redirect to the frontend
	http.Redirect(c.Writer, c.Request, fmt.Sprintf("http://localhost:3000/dashboard/%v/home", user.UserID), http.StatusTemporaryRedirect)
}

func SessionMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		session, err := gothic.Store.Get(ctx.Request, "mysession")
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "failed to retrive session",
			})
		}

		ctx.Set("session", session)
		ctx.Next()
	}
}
