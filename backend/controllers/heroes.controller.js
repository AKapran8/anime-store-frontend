const Hero = require("./../models/hero.model");
const Anime = require("./../models/anime.model");

const getHeroes = (req, res, next) => {
  Hero.find().then((heroesList) => {
    res.status(200).json({ status: "Success", data: heroesList });
  });
};

const addNewHero = (req, res, next) => {
  const reqBody = req.body;

  const newHero = new Hero({
    name: reqBody.name,
    animeId: reqBody.animeId,
    image: reqBody && reqBody.image ? reqBody.image : "",
    quotes: [],
  });

  newHero.save().then((createdHero) => {
    const newHero = { id: createdHero._id, heroName: createdHero.name };
    updateAnimeHeroesList(createdHero.animeId, newHero);

    res
      .status(201)
      .json({ message: "The Hero was added sucessfully", createdHero });
  });
};

const deleteHero = (req, res, next) => {
  const id = req.params.id;

  Hero.deleteOne({ _id: id }).then((result) => {
    res.status(200).json({ message: "The Hero was removed successfully!" });
  });
};

const editHero = (req, res, next) => {
  const heroId = req.params.id;
  const reqBody = req.body;

  Hero.findById(heroId)
    .then((hero) => {
      hero.name = reqBody.name;
      hero.animeId = reqBody.animeId;
      hero.image = reqBody.image;
      hero.quotes = reqBody.quotes;

      return hero.save();
    })
    .then((updatedAnime) => {
      res.json({ message: "The Hero was updated successfully", updatedAnime });
    });
};

const getHeroNames = (req, res, next) => {
  Hero.find()
    .select("name")
    .then((dataTable) => {
      const data = dataTable.map((el) => {
        return { id: el.id, name: el.name };
      });

      res.status(200).json({ status: "Success", data });
    });
};

const updateAnimeHeroesList = (animeId, hero) => {
  Anime.findById(animeId, "heroes.heroName heroes.id").then((anime) => {
    anime.heroes = [...anime.heroes, hero];
    return anime.save();
  });
};

module.exports = { getHeroes, addNewHero, deleteHero, editHero, getHeroNames };
