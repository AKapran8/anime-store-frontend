const Anime = require("./../models/anime.model");
const Hero = require("./../models/hero.model");

const imgHelpers = require("./../helpers/image");

const getAnime = (req, res, next) => {
  Anime.find().then((dataTable) => {
    res.status(200).json({ status: "Success", animeList: dataTable });
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
    heroes: [],
    quotes: [],
  });

  newAnime.save().then((createdAnime) => {
    res
      .status(201)
      .json({ message: "Anime was added sucessfully", anime: createdAnime });
  });
};

const deleteAnime = async (req, res, next) => {
  const id = req.params.id;

  try {
    const anime = await Anime.findById(id);

    if (anime && anime.heroes && anime.heroes.length > 0) {
      const heroIds = anime.heroes.map((hero) => hero.id);

      anime.heroes.forEach((el) => {
        imgHelpers.removeImage(el.imageUrl);
      });
      await Hero.deleteMany({ _id: { $in: heroIds } });
    }
    await Anime.deleteOne({ _id: id });

    res.status(200).json({ message: "Anime was removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove anime" });
  }
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
      anime.heroes = anime && anime.heroes ? anime.heroes : [];
      anime.quotes = anime && anime.quotes ? anime.quotes : [];

      return anime.save();
    })
    .then((updatedAnime) => {
      res.json({ message: "Anime updated successfully", anime: updatedAnime });
    });
};

const getAnimeById = (req, res, next) => {
  const id = req.params.id;

  Anime.find({ _id: id }).then((anime) => {
    res.status(200).json({ status: "Success", anime: anime[0] });
  });
};

module.exports = {
  getAnime,
  addNewAnime,
  deleteAnime,
  editAnime,
  getAnimeById,
};
