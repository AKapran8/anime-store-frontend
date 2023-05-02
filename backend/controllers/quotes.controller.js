const Quote = require("./../models/quote.model");
const Hero = require("./../models/hero.model");

const getQuotes = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const quotes = await Quote.find({ userId: userId });
    res.status(200).json({ message: "Success", quotes });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addNewQuote = async (req, res, next) => {
  const reqBody = req.body;
  const userId = req.userData.userId;

  try {
    const newQuote = new Quote({
      text: reqBody.text,
      season: reqBody.season,
      episode: reqBody.episode,
      time: reqBody.time,
      author: reqBody.author,
      userId,
    });

    const createdQuote = await newQuote.save();

    const hero = await Hero.findById(newQuote.author.id);
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    hero.quotes.push(createdQuote._id);
    await hero.save();

    res
      .status(201)
      .json({ message: "Quote was added sucessfully", quote: createdQuote });
  } catch (err) {
    res.status(500).json({ message: "Failed to add new quote" });
  }
};

const deleteQuote = async (req, res, next) => {
  const quoteId = req.params.id;

  try {
    const quote = await Quote.findById(quoteId);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    const hero = await Hero.findById(quote.author.id);
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    hero.quotes = hero.quotes.filter((q) => q !== quoteId);
    await hero.save();

    Quote.deleteOne({ _id: quoteId }).then((result) => {
      res.status(200).json({ message: "The Quote was removed successfully!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const editQuote = async (req, res, next) => {
  const quoteId = req.params.id;
  const reqBody = req.body;

  try {
    const quote = await Quote.findById(quoteId);
    if (!quote) return res.status(404).json("Quote not found");

    quote.text = reqBody.text.trim();
    quote.season = reqBody.season;
    quote.episode = reqBody.episode;
    quote.time = reqBody.time;

    if (quote.author.id !== reqBody.author.id) {
      const prevHero = await Hero.findById(quote.author.id);
      const newHero = await Hero.findById(reqBody.author.id);

      if (!prevHero) {
        return res.status(404).json({ message: "Previous hero not found" });
      }
      if (!newHero) {
        return res.status(404).json({ message: "New hero not found" });
      }

      prevHero.quotes = prevHero.quotes.filter((q) => q !== quote.id);
      newHero.quotes.push(quote.id);

      await prevHero.save();
      await newHero.save();
    }

    quote.animeId = reqBody.animeId;
    quote.author = reqBody.author;

    await quote.save();
    res.status(201).json({
      message: "The quote was updated successfully",
      quote,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getQuotes,
  addNewQuote,
  editQuote,
  deleteQuote,
};
