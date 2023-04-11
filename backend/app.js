const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Wlyapa:SqHqgqRGVQMZvMAL@anime-store.fnxlp4q.mongodb.net/anime?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DataBase");
  })
  .catch(() => {
    console.error("Connection failed!");
  });

const animeController = require("./controlers/anime/anime");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT, OPTIONS"
  );
  next();
});

// !ANIME PART
// Get all items
app.get("/anime", animeController.getAllAnime);

// Add new item
app.post("/anime", animeController.addNewAnime);

// Edit item
app.put("/anime/:id", animeController.editAnime);

// Delete item
app.delete("/anime/:id", animeController.deleteAnime);

module.exports = app;
