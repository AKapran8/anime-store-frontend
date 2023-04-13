const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const animeRouters = require("./routers/anime");

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

app.use("/api/anime", animeRouters);

module.exports = app;
