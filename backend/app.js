const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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

// TEST PART START
let animeList = [
  {
    id: 1,
    name: "The promised Neverland",
    nameUA: "Обещанный Неверленд",
    stars: 7,
    time: 529,
    genres: "",
    status: "watched",
  },
  {
    id: 2,
    name: "One Punch Man",
    nameUA: "Ванпанчмен",
    stars: 9,
    time: 576,
    genres: "comedy",
    status: "watched",
  },
];

// TEST PART END

// Get all items
app.get("/anime", (req, res, next) => {
  res.status(200).json({ status: "Success", data: animeList });
});

// Add new item
app.post("/anime", (req, res, next) => {
  const newAnime = { ...req.body, id: animeList.length + 1 };
  animeList.push(newAnime);

  res.status(201).json({ message: "Anime was added sucessfully" });
});

// Edit item
app.put("/anime/:id", (req, res, next) => {
  const id = req.params.id;
  const editableAnime = req.body;

  const modifiedArr = animeList.map((a) => {
    if (a.id === +id) return editableAnime;
    return a;
  });
  animeList = [...modifiedArr];

  res.status(201).json({ message: "Was updated successfully" });
});

// Delete item
app.delete("/anime/:id", (req, res, next) => {
  const id = req.params.id;
  const modifiedArr = animeList.filter((a) => a.id !== +id);
  animeList = [...modifiedArr];

  res.status(200).json({ message: "Anime was removed successfully" });
});

module.exports = app;
