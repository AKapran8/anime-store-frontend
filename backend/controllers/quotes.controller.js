const Quote = require("./../models/quote.model");
const Hero = require("./../models/hero.model");
const Anime = require("./../models/anime.model");

const getQuotes = (req, res, next) => {
  Quote.find().then((quotes) => {
    res.status(200).json({ status: "Success", quotes });
  });
};

const addNewQuote = async (req, res, next) => {
  const reqBody = req.body;

  const newQuote = new Quote({
    text: reqBody.text,
    season: reqBody.season,
    episode: reqBody.episode,
    time: reqBody.time,
    author: reqBody.author,
    animeId: reqBody.animeId,
  });

  newQuote.save().then((createdQuote) => {
    Hero.findById(newQuote.author.id).then((hero) => {
      hero.quotes.push(createdQuote._id);
      return hero.save();
    });
    Anime.findById(newQuote.animeId).then((anime) => {
      anime.quotes.push(createdQuote._id);
      return anime.save();
    });

    res
      .status(201)
      .json({ message: "Quote was added sucessfully", createdQuote });
  });
};

const deleteQuote = async (req, res, next) => {
  const quoteId = req.params.id;

  const quote = await Quote.findById(quoteId);
  Anime.findById(quote.animeId).then((anime) => {
    anime.quotes = anime.quotes.filter((quote) => quote !== quoteId);
    return anime.save();
  });
  Hero.findById(quote.author.id).then((hero) => {
    hero.quotes = hero.quotes.filter((q) => q !== quoteId);
    return hero.save();
  });

  Quote.deleteOne({ _id: quoteId }).then((result) => {
    res.status(200).json({ message: "The Quote was removed successfully!" });
  });
};

const editQuote = (req, res, next) => {
  const quoteId = req.params.id;
  const reqBody = req.body;

  Quote.findById(quoteId).then((quote) => {
    console.log('reqBody ', reqBody)
    console.log('quote ', quote)
  });
};

module.exports = {
  getQuotes,
  addNewQuote,
  editQuote,
  deleteQuote,
};
