const Anime = require("./../models/anime.model");
const Hero = require("./../models/hero.model");
const Quote = require("./../models/quote.model");

const imgHelpers = require("./../helpers/image");
const animeHelpers = require("./../helpers/anime");

const getAnime = async (req, res, next) => {
  const pageSize = req.body.utilsData.pageSize;
  const pageIndex = req.body.utilsData.pageIndex;
  const filterValue = req.body.utilsData?.filterInput?.trim() || "";

  if (
    Number.isNaN(pageSize) ||
    Number.isNaN(pageIndex) ||
    pageSize <= 0 ||
    pageIndex < 0
  ) {
    return res.status(400).json({ message: "Invalid pagination parameters" });
  }

  try {
    const filterRegExp = new RegExp(filterValue, "i");
    const totalElements = await Anime.countDocuments({ name: filterRegExp });
    const animeList = await Anime.find({ name: filterRegExp })
      .skip(pageSize * pageIndex)
      .limit(pageSize);

    const data = {
      totalElements,
      animeList,
    };

    res.status(200).json({ message: "success", data });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAnimeNames = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const list = await Anime.find({ userId: userId }).select("name heroes");
    const animeList = list.map((el) => {
      const existedHeroes = el.heroes.map((h) => h.heroName) || [];
      return { id: el._id, text: el.name, existedHeroes };
    });
    res.status(200).json({ message: "Success", animeList });
  } catch (err) {
    res.status(500).json({ message: "Unable to get anime list" });
  }
};

const addNewAnime = async (req, res, next) => {
  const reqBody = req.body;
  const userId = req.userData.userId;

  if (!userId) return res.status(401).json({ message: "Unauthorized access" });

  const nameRegex = { $regex: reqBody.name.trim(), $options: "i" };
  const existedName = await Anime.findOne({
    name: nameRegex,
    userId: userId,
  });
  if (existedName) return res.status(400).json({ message: "The name existed" });

  const newAnime = new Anime({
    name: reqBody.name.trim(),
    nameUA: reqBody.nameUA.trim(),
    rating: reqBody.rating,
    status: reqBody.status,
    time: reqBody.time,
    genres: reqBody?.genres || "",
    heroes: [],
    userId,
  });

  try {
    await newAnime.save();
    res.status(201).json({ message: "Anime was added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add anime" });
  }
};

const deleteAnime = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userId = req.userData.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const anime = await Anime.findOneAndRemove({ _id: id, userId: userId });
    let quotesIds;
    if (anime?.heroes?.length > 0) {
      const heroIds = anime.heroes.map((hero) => {
        if (hero.imageUrl) imgHelpers.removeImage(hero.imageUrl); //remove hero img from storage
        return hero.id;
      });

      const heroes = await Hero.find({ _id: { $in: heroIds } }).select(
        "quotes"
      );

      quotesIds = [];
      heroes.forEach((h) => {
        if (h?.quotes.length > 0) {
          h.quotes.forEach((q) => {
            if (q) {
              quotesIds.push(q);
            }
          });
        }
      });

      await Quote.deleteMany({ _id: { $in: quotesIds } });
      await Hero.deleteMany({ _id: { $in: heroIds } });
    }

    await Anime.deleteOne({ _id: id });

    res.status(200).json({ message: "Anime was removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove anime" });
  }
};

const editAnime = async (req, res, next) => {
  const animeId = req.params.id;
  const reqBody = req.body;

  try {
    const userId = req.userData.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const nameRegex = { $regex: reqBody.name.trim(), $options: "i" };
    const existedName = await Anime.findOne({
      name: nameRegex,
      userId: userId,
      _id: { $ne: animeId },
    });
    if (existedName) {
      return res.status(400).json({ message: "The name existed" });
    }

    const updatedAnime = await Anime.findOneAndUpdate(
      { _id: animeId, userId: userId },
      {
        name: reqBody.name.trim(),
        nameUA: reqBody.nameUA.trim(),
        rating: reqBody.rating,
        status: reqBody.status,
        time: reqBody.time,
        genres: reqBody?.genres || "",
      }
    );

    if (!updatedAnime) {
      return res.status(404).json({ message: "Anime not found" });
    }

    res.status(201).json({
      message: "Anime updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to edit anime" });
  }
};

const getAnimeById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userId = req.userData.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const findedAnime = await Anime.findOne({ _id: id, userId: userId });
    if (!findedAnime) {
      return res.status(404).json({ message: "Anime not found" });
    }

    let heroesList;
    let quotesList;
    if (findedAnime?.heroes?.length) {
      const heroesIds = findedAnime.heroes.map((h) => h.id);
      heroesList = await Hero.find({ _id: { $in: heroesIds } });
    }

    let quotesIds;
    if (heroesList?.length) {
      quotesIds = [];
      heroesList.forEach((h) => {
        if (h?.quotes.length > 0) {
          h.quotes.forEach((q) => {
            if (q) quotesIds.push(q);
          });
        }
      });

      quotesList = await Quote.find({ _id: { $in: quotesIds } });
    }

    const heroes = animeHelpers.getHeroWithQuotes(heroesList, quotesList);

    const anime = {
      id: findedAnime._id,
      name: findedAnime.name,
      nameUA: findedAnime.nameUA,
      rating: findedAnime.rating,
      status: findedAnime.status,
      time: findedAnime.time,
      genres: findedAnime.genres,
      heroes,
      userId,
    };

    res.status(200).json({ message: "Success", anime });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const copyAnime = async (req, res, next) => {
  const animeId = req.body.id;

  try {
    const userId = req.userData.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const copiedAnime = await Anime.findOne({ _id: animeId });

    const nameRegex = { $regex: copiedAnime.name, $options: "i" };
    const existed = await Anime.findOne({
      name: nameRegex,
      userId: userId,
    });

    if (existed) return res.status(400).json({ message: "The name existed" });

    const anime = new Anime({
      name: copiedAnime.name,
      nameUA: copiedAnime.nameUA,
      userId,
      rating: copiedAnime.rating,
      status: copiedAnime.status,
      time: copiedAnime.time,
      heroes: [],
      genres: copiedAnime.genres || "",
    });

    const duplicatedAnime = await anime.save();

    if (copiedAnime?.heroes?.length) {
      duplicatedAnime.heroes = await animeHelpers.copyAnimeHeroes(
        copiedAnime,
        duplicatedAnime,
        userId
      );

      await duplicatedAnime.save();
    }

    res.status(201).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAnime,
  addNewAnime,
  deleteAnime,
  editAnime,
  getAnimeById,
  getAnimeNames,
  copyAnime,
};
