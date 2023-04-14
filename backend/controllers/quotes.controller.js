const Quote = require("./../models/quote.model");
const Hero = require("./../models/hero.model");
const Anime = require("./../models/anime.model");

const getQuotes = (req, res, next) => {
  Quote.find().then((quotesList) => {
    res.status(200).json({ status: "Success", data: quotesList });
  });
};

const addNewQuote = (req, res, next) => {
  // const reqBody = req.body;

  // const newQuote = new Quote({
  //   text: reqBody.text,
  //   season: reqBody.season,
  //   episode: reqBody.episode,
  //   time: reqBody.time,
  //   author: reqBody.author,
  //   animeId: reqBody.animeId,
  // });

  // newQuote.save().then((createdQuote) => {
  //   const newHeroQuote = { id: createdQuote ._id, }
  //   const newHero = { id: createdQuote._id, heroName: createdQuote.name };
  //   updateAnimeHeroesList(createdQuote.animeId, newHero);

  //   res
  //     .status(201)
  //     .json({ message: "Quote was added sucessfully", createdQuote });
  // });
};

const deleteQuote = (req, res, next) => {
  const id = req.params.id;

  Quote.deleteOne({ _id: id }).then((result) => {
    res.status(200).json({ message: "The Quote was removed successfully!" });
  });
};

const editQuote = (req, res, next) => {
  // const heroId = req.params.id;
  // const reqBody = req.body;
  // Hero.findById(heroId)
  //   .then((hero) => {
  //     hero.name = reqBody.name;
  //     hero.animeId = reqBody.animeId;
  //     hero.image = reqBody.image;
  //     hero.quotes = reqBody.quotes;
  //     return hero.save();
  //   })
  //   .then((updatedAnime) => {
  //     res.json({ message: "The Hero was updated successfully", updatedAnime });
  //   });
};

const getHeroNames = (req, res, next) => {
  Hero.find()
    .select("name")
    .then((dataTable) => {
      const data = dataTable.map((el) => {
        return { id: el._id, name: el.name };
      });

      res.status(200).json({ status: "Success", data });
    });
};

const updateAnimeHeroesList = (animeId, hero) => {
  // Anime.findById(animeId, "heroes.heroName heroes.id").then((anime) => {
  //   anime.heroes = [...anime.heroes, hero];
  //   return anime.save();
  // });
};

module.exports = {
  getQuotes,
  addNewQuote,
  deleteQuote,
  editQuote,
  getHeroNames,
};
