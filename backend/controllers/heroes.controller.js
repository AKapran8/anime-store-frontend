const Hero = require("./../models/hero.model");
const Anime = require("./../models/anime.model");

const imgHelpers = require("./../helpers/image");

const getHeroes = (req, res, next) => {
  Hero.find().then((heroesList) => {
    res.status(200).json({ status: "Success", heroesList: heroesList });
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
    const newHeroResponse = {
      id: createdHero._id,
      heroName: createdHero.name,
      imageUrl: createdHero.imageUrl,
      quotes: createdHero && createdHero.quotes ? createdHero.quotes : [],
    };
    _addNewAnimeHero(createdHero.animeId, newHeroResponse);

    res
      .status(201)
      .json({ message: "The Hero was added sucessfully", hero: createdHero });
  });
};

const deleteHero = async (req, res, next) => {
  const id = req.params.id;

  try {
    const hero = await Hero.findOne({ _id: id });
    _removeAnimeHero(hero.animeId, id);

    Hero.deleteOne({ _id: id }).then((result) => {
      imgHelpers.removeImage(hero.imageUrl);

      res.status(200).json({ message: "The Hero was removed successfully!" });
    });
  } catch (err) {}
};

const editHero = (req, res, next) => {
  const heroId = req.params.id;
  const reqBody = req.body;

  Hero.findById(heroId)
    .then((hero) => {
      const prevImageUrl = hero.imageUrl;
      const nameForImage = reqBody.name.replace(/\s/g, "").toLowerCase();
      const imageMimeType = hero.imageUrl.split(".")[1];
      const newImgUrl = `${nameForImage}_${reqBody.animeId}.${imageMimeType}`;

      const newHero = {
        id: heroId,
        heroName: reqBody.name,
        imageUrl: newImgUrl,
        quotes: reqBody && reqBody.quotes ? reqBody.quotes : [],
      };

      if (reqBody.animeId !== hero.animeId) {
        _removeAnimeHero(hero.animeId, heroId);
        _addNewAnimeHero(reqBody.animeId, newHero);
      } else {
        _updateCurrentAnimeHero(reqBody.animeId, newHero);
      }

      hero.name = reqBody.name;
      hero.quotes = reqBody.quotes;
      hero.animeId = reqBody.animeId;
      hero.imageUrl = newImgUrl;

      imgHelpers.changeImageName(prevImageUrl, newImgUrl);

      return hero.save();
    })
    .then((updatedHero) => {
      res.json({
        message: "The Hero was updated successfully",
        hero: updatedHero,
      });
    });
};

const getHeroNames = (req, res, next) => {
  Hero.find()
    .select("name")
    .then((dataTable) => {
      const heroesList = dataTable.map((el) => {
        return { id: el.id, name: el.name };
      });

      res.status(200).json({ status: "Success", heroesList });
    });
};

const _addNewAnimeHero = (animeId, hero) => {
  Anime.findById(animeId).then((anime) => {
    anime.heroes.push(hero);
    return anime.save();
  });
};

const _updateCurrentAnimeHero = (animeId, updatedHero) => {
  Anime.findById(animeId).then((anime) => {
    anime.heroes = anime.heroes.map((hero) => {
      if (hero.id === updatedHero.id) return updatedHero;
      return hero;
    });
    return anime.save();
  });
};

const _removeAnimeHero = (animeId, heroId) => {
  Anime.findById(animeId).then((anime) => {
    const index = anime.heroes.findIndex((a) => a.id === heroId);
    if (index >= 0) {
      anime.heroes.splice(index, 1);
      return anime.save();
    }
  });
};

module.exports = { getHeroes, addNewHero, deleteHero, editHero, getHeroNames };
