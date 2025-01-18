package main

import (
	"net/http"

	"github.com/Qu-Ack/iitjodhpur/go_backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func (s state) handleGetUser(c *gin.Context) {

	session, exists := c.Get("session")

	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to retrieve the session",
		})
		return
	}

	userSession, ok := session.(*sessions.Session)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to retrieve the session",
		})
		return
	}

	_, ok = userSession.Values["user"].(string)

	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve the session"})
		return
	}

	userid := c.Param("userid")

	userCollection := s.DB.Collection("users")

	var user database.User

	singleResult := userCollection.FindOne(c.Request.Context(), bson.D{{"UserID", userid}})

	if singleResult.Err() != nil {
		if singleResult.Err() == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	if err := singleResult.Decode(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to decode the object"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}

func (s state) handlePushImage(c *gin.Context) {
	session, exists := c.Get("session")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to retrieve the session",
		})
		return
	}

	userSession, ok := session.(*sessions.Session)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to retrieve the session",
		})
		return
	}

	userID, ok := userSession.Values["user"].(string)
	if !ok || userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user not authenticated"})
		return
	}

	var body struct {
		ImageUrl string `json:"ImageUrl"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	if body.ImageUrl == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ImageUrl cannot be empty"})
		return
	}

	userid := c.Param("userid")

	userCollection := s.DB.Collection("users")

	filter := bson.D{{"UserID", userid}}
	update := bson.D{{"$push", bson.D{{"Images", body.ImageUrl}}}}

	result := userCollection.FindOneAndUpdate(c.Request.Context(), filter, update)
	if result.Err() != nil {
		if result.Err() == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update user images"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "image added successfully"})
}
