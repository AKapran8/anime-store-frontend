const Quote = require("./../models/quote.model");
const Hero = require("./../models/hero.model");
const Anime = require("./../models/anime.model");

const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json({ status: "Success", quotes });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const addNewQuote = async (req, res, next) => {
  const reqBody = req.body;

  try {
    const newQuote = new Quote({
      text: reqBody.text,
      season: reqBody.season,
      episode: reqBody.episode,
      time: reqBody.time,
      author: reqBody.author,
      animeId: reqBody.animeId,
    });

    const createdQuote = await newQuote.save();

    const hero = await Hero.findById(newQuote.author.id);
    if (!hero) throw new Error("Hero not found");
    hero.quotes.push(createdQuote._id);
    await hero.save();

    const anime = await Hero.findById(newQuote.animeId);
    if (!anime) throw new Error("Anime not found");
    anime.quotes.push(createdQuote._id);
    await anime.save();

    res
      .status(201)
      .json({ message: "Quote was added sucessfully", createdQuote });
  } catch (err) {
    res.status(500).json({ message: "Failed to add new quote" });
  }
};

const deleteQuote = async (req, res, next) => {
  const quoteId = req.params.id;

  try {
    const quote = await Quote.findById(quoteId);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    const anime = await Anime.findById(quote.animeId);
    if (!anime) throw new Error("Anime not found");

    anime.quotes = anime.quotes.filter((quote) => quote !== quoteId);
    await anime.save();

    const hero = await Hero.findById(quote.author.id);
    if (!hero) throw new Error("Hero not found");

    hero.quotes = hero.quotes.filter((q) => q !== quoteId);
    await hero.save();

    Quote.deleteOne({ _id: quoteId }).then((result) => {
      res.status(200).json({ message: "The Quote was removed successfully!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const editQuote = (req, res, next) => {
  const quoteId = req.params.id;
  const reqBody = req.body;

  Quote.findById(quoteId).then((quote) => {
    console.log("reqBody ", reqBody);
    console.log("quote ", quote);
  });
};

module.exports = {
  getQuotes,
  addNewQuote,
  editQuote,
  deleteQuote,
};
