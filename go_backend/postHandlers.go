package main

import (
	"net/http"

	"github.com/Qu-Ack/iitjodhpur/go_backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s state) handleCreatePost(c *gin.Context) {
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
		Title   string `json:"Title"`
		Author  string `json:"Author"`
		Content string `json:"Content"`
	}

	var Body body
	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid JSON fields"})
		return
	}

	var user database.User
	postCollection := s.DB.Collection("posts")
	userCollection := s.DB.Collection("users")

	err := userCollection.FindOne(c.Request.Context(), bson.D{{"UserID", Body.Author}}).Decode(&user)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	post := database.Post{
		Title:   Body.Title,
		Content: Body.Content,
		Author:  user.ID,
	}

	_, err = postCollection.InsertOne(c.Request.Context(), post)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "successfully inserted the post"})
}

func (s state) handleGetUserPosts(c *gin.Context) {
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
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userid := c.Param("userid")
	userCollection := s.DB.Collection("users")

	var user database.User
	err := userCollection.FindOne(c.Request.Context(), bson.D{{"UserID", userid}}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch user"})
		return
	}

	postCollection := s.DB.Collection("posts")

	cursor, err := postCollection.Find(c.Request.Context(), bson.D{{"Author", user.ID}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch posts"})
		return
	}
	defer cursor.Close(c.Request.Context())

	var posts []database.Post
	if err = cursor.All(c.Request.Context(), &posts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to decode posts"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user":  user,
		"posts": posts,
	})
}

func (s state) handleGetAllPosts(c *gin.Context) {

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
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	postCollection := s.DB.Collection("posts")
	userCollection := s.DB.Collection("users")

	// Fetch all posts
	cursor, err := postCollection.Find(c.Request.Context(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch posts"})
		return
	}
	defer cursor.Close(c.Request.Context())

	var posts []database.Post
	if err := cursor.All(c.Request.Context(), &posts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to decode posts"})
		return
	}

	// Prepare the response
	var response []gin.H
	for _, post := range posts {
		// Fetch the author of the post
		var user database.User
		err := userCollection.FindOne(c.Request.Context(), bson.D{{"_id", post.Author}}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch user for post"})
			return
		}

		// Add post title, user info, and number of comments to the response
		response = append(response, gin.H{
			"Title":          post.Title,
			"User":           user,
			"NumberComments": len(post.Comments),
		})
	}

	c.JSON(http.StatusOK, response)
}

func (s state) handleGetAllComments(c *gin.Context) {

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
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	postIDParam := c.Param("postid")
	if postIDParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "post ID is required"})
		return
	}

	postID, err := primitive.ObjectIDFromHex(postIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid post ID format"})
		return
	}

	postCollection := s.DB.Collection("posts")
	var post database.Post
	err = postCollection.FindOne(c.Request.Context(), bson.D{{"_id", postID}}).Decode(&post)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "post not found"})
		return
	}

	var response []gin.H

	commentCollection := s.DB.Collection("comments")
	userCollection := s.DB.Collection("users")

	for _, commentID := range post.Comments {
		var comment database.Comment
		err := commentCollection.FindOne(c.Request.Context(), bson.D{{"_id", commentID}}).Decode(&comment)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch comment"})
			return
		}

		var user database.User
		err = userCollection.FindOne(c.Request.Context(), bson.D{{"_id", comment.Author}}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch user for comment"})
			return
		}

		response = append(response, gin.H{
			"User":    user,
			"Comment": comment,
		})
	}

	c.JSON(http.StatusOK, response)
}
