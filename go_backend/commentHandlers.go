package main

import (
	"net/http"

	"github.com/Qu-Ack/iitjodhpur/go_backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s state) handleCreateComment(c *gin.Context) {
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

	type body struct {
		PostId  string `json:"PostId"`
		Content string `json:"Content"`
		Author  string `json:"Author"`
	}

	var Body body

	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON body"})
		return
	}

	postCollection := s.DB.Collection("posts")
	userCollection := s.DB.Collection("users")
	commentCollection := s.DB.Collection("comments")

	var user database.User

	err := userCollection.FindOne(c.Request.Context(), bson.D{{"UserID", Body.Author}}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot find user"})
		return
	}

	// Create the comment document
	comment := database.Comment{
		Author:  user.ID,
		Content: Body.Content,
	}

	commentResult, err := commentCollection.InsertOne(c.Request.Context(), comment)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert comment"})
		return
	}

	// Get the inserted comment's object ID
	commentID, ok := commentResult.InsertedID.(primitive.ObjectID)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid comment ID"})
		return
	}

	// Push the comment ID into the comments array of the post document
	filter := bson.D{{"_id", Body.PostId}}
	update := bson.D{{"$push", bson.D{{"comments", commentID}}}}

	_, err = postCollection.UpdateOne(c.Request.Context(), filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post with comment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Comment added successfully", "commentID": commentID.Hex()})
}
