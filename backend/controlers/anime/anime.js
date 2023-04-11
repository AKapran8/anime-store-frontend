const Anime = require("./../../models/anime.model");

const getAllAnime = (req, res, next) => {
  Anime.find().then((dataTable) => {
    res.status(200).json({ status: "Success", data: dataTable });
  });
};

const addNewAnime = (req, res, next) => {
  const reqBody = req.body;

  const newAnime = new Anime({
    name: reqBody.name,
    nameUA: reqBody.nameUA,
    stars: reqBody.stars,
    status: reqBody.status,
    time: reqBody.time,
    genres: reqBody && reqBody.genres ? reqBody.genres : "",
  });

  newAnime.save();

  res.status(201).json({ message: "Anime was added sucessfully" });
};

const editAnime = (req, res, next) => {
  const id = req.params.id;
  const editableAnime = req.body;

  res.status(201).json({ message: "Was updated successfully" });
};

const deleteAnime = (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({ message: "Anime was removed successfully" });
};

module.exports = { getAllAnime, addNewAnime, editAnime, deleteAnime };
