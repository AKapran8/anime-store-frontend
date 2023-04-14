const Anime = require("./../models/anime.model");

const getAnime = (req, res, next) => {
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

  newAnime.save().then((createdAnime) => {
    res
      .status(201)
      .json({ message: "Anime was added sucessfully", createdAnime });
  });
};

const deleteAnime = (req, res, next) => {
  const id = req.params.id;

  Anime.deleteOne({ _id: id }).then((result) => {
    res.status(200).json({ message: "Anime was removed successfully" });
  });
};

const editAnime = (req, res, next) => {
  const animeId = req.params.id;
  const reqBody = req.body;

  Anime.findById(animeId)
    .then((anime) => {
      anime.name = reqBody.name;
      anime.nameUA = reqBody.nameUA;
      anime.stars = reqBody.stars;
      anime.status = reqBody.status;
      anime.time = reqBody.time;
      anime.genres = reqBody && reqBody.genres ? reqBody.genres : "";

      return anime.save();
    })
    .then((updatedAnime) => {
      res.json({ message: "Anime updated successfully", updatedAnime });
    });
};

const getAnimeNames = (req, res, next) => {
  Anime.find()
    .select("name")
    .then((dataTable) => {
      const modifiedData = dataTable.map((el) => {
        return { id: el._id, name: el.name };
      });

      res.status(200).json({ status: "Success", data: modifiedData });
    });
};

module.exports = {
  getAnime,
  addNewAnime,
  deleteAnime,
  editAnime,
  getAnimeNames,
};
