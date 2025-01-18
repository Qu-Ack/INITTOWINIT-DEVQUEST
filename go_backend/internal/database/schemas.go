package database

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Report struct {
	ImageUrl        string         `bson:"ImageUrl,omitempty" json:"ImageUrl"`
	Disease         string         `bson:"Disease,omitempty" json:"Disease"`
	DoshaAnalysis   Dosha          `bson:"DoshAnalysis" json:"DoshaAnalysis"`
	Recommendations Recommendation `bson:"Recommendations" json:"Recommendations"`
}

type Recommendation struct {
	Diet           []string `bson:"Diet,omitempty" json:"Diet"`
	LifeStyle      []string `bson:"LifeStyle,omitempty" json:"LifeStyle"`
	HerbalRemedies []string `bson:"HerbalRemedies" json:"HerbalRemedies"`
}

type Dosha struct {
	Vata  string `bson:"Vata,omitempty" json:"Vata"`
	Pitta string `bson:"Pitta,omitempty" json:"Pitta"`
	Kapha string `bson:"Kapha,omitempty" json:"Kapha"`
}

type User struct {
	ID     primitive.ObjectID `bson:"_id,omitempty"`
	Name   string             `bson:"Name,omitempty" json:"Name"`
	Email  string             `bson:"Email,omitempty" json:"Email"`
	UserID string             `bson:"UserID,omitempty" json:"UserID"`
	Images []string           `bson:"Images,omitempty" json:"Images"`
}

type Post struct {
	Title    string               `bson:"Title,omitempty" json:"TItle"`
	Content  string               `bson:"Content,omitempty" json:"Content"`
	Author   primitive.ObjectID   `bson:"Author,omitempty" json:"Author"`
	Comments []primitive.ObjectID `bson:"Comments,omitempty" json:"Comments"`
}

type Comment struct {
	Author  primitive.ObjectID `bson:"Author,omitempty" json:"Author"`
	Content string             `bson:"Content,omitempty" json:"Content"`
}

func ConnectDB() *mongo.Client {

	mongoDbURI := os.Getenv("MONGODB_URI")

	log.Println(mongoDbURI)

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoDbURI))

	if err != nil {
		panic(err)
	}

	return client

}
