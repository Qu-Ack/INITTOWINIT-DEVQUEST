package main

import (
	"net/http"

	"github.com/Qu-Ack/iitjodhpur/go_backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s state) handlePostReport(c *gin.Context) {
	// Retrieve session data
	session, exists := c.Get("session")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve session"})
		return
	}

	userSession, ok := session.(*sessions.Session)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to cast session"})
		return
	}

	// Retrieve user ID from session
	userId, ok := userSession.Values["user"].(string)
	if !ok || userId == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// Parse incoming report data
	var report database.Report
	if err := c.ShouldBindJSON(&report); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Insert report into the 'reports' collection
	reportCollection := s.DB.Collection("reports")
	insertedResult, err := reportCollection.InsertOne(c.Request.Context(), report)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert report"})
		return
	}

	// Update user collection with the inserted report ID
	userCollection := s.DB.Collection("users")
	updateResult := userCollection.FindOneAndUpdate(
		c.Request.Context(),
		bson.M{"UserID": userId},
		bson.M{"$push": bson.M{"Reports": insertedResult.InsertedID}},
	)
	if updateResult.Err() != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user with report"})
		return
	}

	// Return success response
	c.JSON(http.StatusCreated, gin.H{"message": "Report successfully created", "reportid": insertedResult.InsertedID})
}

func (s state) handleGetReport(c *gin.Context) {

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

	reportid := c.Param("postid")

	reportCollection := s.DB.Collection("reports")

	reportObjectId, err := primitive.ObjectIDFromHex(reportid)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse the object id"})
		return
	}
	var report database.Report
	err = reportCollection.FindOne(c.Request.Context(), bson.D{{"_id", reportObjectId}}).Decode(&report)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to find the report"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"report": report})

}
