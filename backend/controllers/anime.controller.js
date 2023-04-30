const Anime = require("./../models/anime.model");
const Hero = require("./../models/hero.model");
const Quote = require("./../models/quote.model");

const imgHelpers = require("./../helpers/image");

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
    let totalElements;
    let animeList;

    if (filterValue) {
      const filterRegExp = new RegExp(filterValue, "i");
      totalElements = await Anime.countDocuments({ name: filterRegExp });
      animeList = await Anime.find({ name: filterRegExp })
        .skip(pageSize * pageIndex)
        .limit(pageSize);
    } else {
      totalElements = await Anime.countDocuments();
      animeList = await Anime.find()
        .skip(pageSize * pageIndex)
        .limit(pageSize);
    }

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
    if (!userId) res.status(401).json({ message: "Unauthorized access" });

    const list = await Anime.find({ userId: userId }).select("name");
    const animeList = list.map((el) => {
      return { id: el._id, text: el.name };
    });
    res.status(200).json({ message: "Success", animeList });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to get anime list" });
  }
};

const addNewAnime = async (req, res, next) => {
  const reqBody = req.body;
  const userId = req.userData.userId;

  if (!userId) res.status(401).json({ message: "Unauthorized access" });

  const existingAnime = await Anime.findOne({ name: reqBody.name.trim(), userId: userId });

  if (existingAnime) {
    return res.status(400).json({ message: "Anime name already exists" });
  }

  const newAnime = new Anime({
    name: reqBody.name.trim(),
    nameUA: reqBody.nameUA.trim(),
    stars: reqBody.stars,
    status: reqBody.status,
    time: reqBody.time,
    genres: reqBody?.genres || "",
    heroes: [],
    userId,
  });

  try {
    const createdAnime = await newAnime.save();
    res
      .status(201)
      .json({ message: "Anime was added successfully", anime: createdAnime });
  } catch (error) {
    res.status(500).json({ message: "Failed to add anime" });
  }
};

const deleteAnime = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userId = req.userData.userId;
    if (!userId) res.status(401).json({ message: "Unauthorized access" });

    const anime = await Anime.findOneAndRemove({ _id: id, userId: userId });
    let quotesIds;
    if (anime?.heroes?.length > 0) {
      const heroIds = anime.heroes.map((hero) => {
        imgHelpers.removeImage(hero.imageUrl); //remove hero img from storage
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
    if (!userId) res.status(401).json({ message: "Unauthorized access" });

    const updatedAnime = await Anime.findOneAndUpdate(
      { _id: animeId, userId: userId },
      {
        name: reqBody.name.trim(),
        nameUA: reqBody.nameUA.trim(),
        stars: reqBody.stars,
        status: reqBody.status,
        time: reqBody.time,
        genres: reqBody?.genres || "",
      }
    );

    if (!updatedAnime) {
      return res.status(404).json({ message: "Anime not found" });
    }

    res.json({
      message: "Anime updated successfully",
      anime: updatedAnime,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to edit anime" });
  }
};

const getAnimeById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userId = req.userData.userId;
    if (!userId) res.status(401).json({ message: "Unauthorized access" });

    const anime = await Anime.find({ _id: id, userId: userId });
    if (!anime) {
      return res
        .status(404)
        .json({ message: "Anime not found" });
    }

    res.status(200).json({ message: "Success", anime: anime[0] });
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
};
