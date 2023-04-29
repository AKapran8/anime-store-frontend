const Anime = require("./../models/anime.model");
const Hero = require("./../models/hero.model");
const Quote = require("./../models/quote.model");

const imgHelpers = require("./../helpers/image");

const getAnime = async (req, res, next) => {
  const pageSize = req.body.paginationConfig.pageSize;
  const pageIndex = req.body.paginationConfig.pageIndex;

  try {
    const totalElements = await Anime.countDocuments();
    const animeList = await Anime.find()
      .skip(pageSize * pageIndex)
      .limit(pageSize);

    const data = {
      totalElements,
      animeList,
    };

    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const getAnimeNames = async (req, res, next) => {
  try {
    const list = await Anime.find().select("name");
    const animeList = list.map((el) => {
      return { id: el._id, text: el.name };
    });
    res.status(200).json({ status: "Success", animeList });
  } catch (err) {
    res
      .status(500)
      .json({ status: "Error", message: "Unable to get anime list" });
  }
};

const addNewAnime = async (req, res, next) => {
  const reqBody = req.body;

  const existingAnime = await Anime.findOne({ name: reqBody.name.trim() });

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
    const anime = await Anime.findById(id);
    if (anime?.heroes?.length > 0) {
      const heroIds = anime.heroes.map((hero) => {
        imgHelpers.removeImage(hero.imageUrl); //remove hero img from storage
        return hero.id;
      });

      const heroes = await Hero.find({ _id: { $in: heroIds } }).select(
        "quotes"
      );

      // looks ugly, but I don't have any idea how to fix it
      //  quotesIds.push(q); => Argument of type 'any' is not assignable to parameter of type 'never'.ts(2345)
      const quotesIds = [""].splice(1, 1);
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
    const updatedAnime = await Anime.findById(animeId);
    if (!updatedAnime) {
      return res.status(404).json({ message: "Anime not found" });
    }

    updatedAnime.name = reqBody.name.trim();
    updatedAnime.nameUA = reqBody.nameUA.trim();
    updatedAnime.stars = reqBody.stars;
    updatedAnime.status = reqBody.status;
    updatedAnime.time = reqBody.time;
    updatedAnime.genres = reqBody?.genres || "";

    await updatedAnime.save();

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
    const anime = await Anime.find({ _id: id });
    if (!anime) {
      return res
        .status(404)
        .json({ status: "error", message: "Anime not found" });
    }

    res.status(200).json({ status: "Success", anime: anime[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
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
