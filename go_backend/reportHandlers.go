package main

import (
	"net/http"

	"github.com/Qu-Ack/iitjodhpur/go_backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
)

func (s state) handlePostReport(c *gin.Context) {
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

	var report database.Report

	if err := c.ShouldBindJSON(&report); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "couldn't parse fields in body"})
		return
	}

	reportCollection := s.DB.Collection("reports")

	_, err := reportCollection.InsertOne(c.Request.Context(), report)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error while inserting report"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "successfully report"})
}
