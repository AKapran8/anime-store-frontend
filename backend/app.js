const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const animeRouters = require("./routers/anime.routers");
const heroesRouters = require("./routers/hero.routers");
const quotesRouters = require("./routers/quote.routers");
const userRouters = require("./routers/user.routers");

const dbPass = process.env.MONGO_ATLAS_PASSWORD;
const DbuserName = process.env.MONGO_ATLAS_USER;
const dbConnectUrl = `mongodb+srv://${DbuserName}:${dbPass}@anime-store.fnxlp4q.mongodb.net/my-store?retryWrites=true&w=majority`;

mongoose
  .connect(dbConnectUrl)
  .then(() => {
    console.log("Connected to DataBase");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT, OPTIONS"
  );
  next();
});

app.use("/api/anime", animeRouters);
app.use("/api/heroes", heroesRouters);
app.use("/api/quotes", quotesRouters);
app.use("/api/user", userRouters);

module.exports = app;
