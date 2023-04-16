const Hero = require("./../models/hero.model");
const Anime = require("./../models/anime.model");

const imgHelpers = require("./../helpers/image");

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
    imageUrl: reqBody.imageUrl,
    quotes: [],
  });

  newHero.save().then((createdHero) => {
    const newHero = {
      id: createdHero._id,
      heroName: createdHero.name,
      imageUrl: createdHero.imageUrl,
    };
    _updateAnimeHeroesList(createdHero.animeId, newHero);

    res
      .status(201)
      .json({ message: "The Hero was added sucessfully", hero: createdHero });
  });
};

const deleteHero = (req, res, next) => {
  const id = req.params.id;
  const fileName = req.query.fileName;
  const animeId = req.query.animeId;

  _removeAnimeHero(animeId, id);

  Hero.deleteOne({ _id: id }).then((result) => {
    imgHelpers.removeImage(fileName);

    res.status(200).json({ message: "The Hero was removed successfully!" });
  });
};

const editHero = (req, res, next) => {
  const heroId = req.params.id;
  const reqBody = req.body;

  Hero.findById(heroId)
    .then((hero) => {
      const prevImageUrl = hero.imageUrl;
      const imageMimeType = hero.imageUrl.split(".")[1];
      const newImgUrl = `${reqBody.name.toLowerCase()}_${
        reqBody.animeId
      }.${imageMimeType}`;

      hero.name = reqBody.name;
      hero.quotes = reqBody.quotes;
      hero.animeId = reqBody.animeId;
      hero.imageUrl = newImgUrl;

      if (reqBody.animeId !== hero.animeId) {
        _removeAnimeHero(hero.animeId, heroId);
        const newHero = {
          id: hero._id,
          heroName: hero.name,
          imageUrl: hero.imageUrl,
        };

        _updateAnimeHeroesList(reqBody.animeId, newHero);
      }

      imgHelpers.changeImageName(prevImageUrl, newImgUrl);

      return hero.save();
    })
    .then((updatedHero) => {
      res.json({ message: "The Hero was updated successfully", hero: updatedHero });
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

const _updateAnimeHeroesList = (animeId, hero) => {
  Anime.findById(animeId, "heroes").then((anime) => {
    if (anime.heroes.length > 0) {
      anime.heroes = [...anime.heroes, hero];
    } else {
      anime.heroes.push(hero);
    }

    return anime.save();
  });
};

const _removeAnimeHero = (animeId, heroId) => {
  Anime.findById(animeId, "heroes").then((anime) => {
    const index = anime.heroes.findIndex((a) => a.id === heroId);
    anime.heroes.splice(index, 1);

    return anime.save();
  });
};

module.exports = { getHeroes, addNewHero, deleteHero, editHero, getHeroNames };
