const Hero = require("./../models/hero.model");
const Anime = require("./../models/anime.model");
const Quote = require("./../models/quote.model");

const imgHelpers = require("./../helpers/image");

const getHeroes = async (req, res, next) => {
  try {
    const heroesList = await Hero.find();
    res.status(200).json({ message: "Success", heroesList });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addNewHero = async (req, res, next) => {
  const reqBody = req.body;
  const url = `${req.protocol}://${req.get("host")}`;

  try {
    const userId = req.userData.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const nameRegex = { $regex: reqBody.name.trim(), $options: "i" };
    const existedHeroName = await Hero.findOne({
      name: nameRegex,
      animeId: reqBody.animeId,
      userId: userId,
    });
    if (existedHeroName) {
      return res
        .status(400)
        .json({ message: "This hero name exist in current anime" });
    }

    const imageUrl = `${url}/images/${reqBody.imageUrl}`;

    const newHero = new Hero({
      name: reqBody.name.trim(),
      animeId: reqBody.animeId,
      userId,
      imageUrl,
      quotes: [],
    });

    const createdHero = await newHero.save();

    const newAnimeHero = {
      id: createdHero._id,
      heroName: createdHero.name,
      imageUrl: createdHero.imageUrl,
    };

    const anime = await Anime.findById(createdHero.animeId);
    if (!anime) return res.status(404).json({ message: "Anime not found" });
    anime.heroes.push(newAnimeHero);
    await anime.save();

    res
      .status(201)
      .json({ message: "The Hero was added successfully", hero: createdHero });
  } catch (err) {
    res.status(500).json({ message: "Failed to add new hero" });
  }
};

const deleteHero = async (req, res, next) => {
  const id = req.params.id;

  try {
    const hero = await Hero.findOne({ _id: id });
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    const anime = await Anime.findById(hero.animeId);
    if (!anime) return res.status(404).json({ message: "Anime not found" });

    anime.heroes = anime.heroes.filter((h) => h.id !== hero.id);

    if (hero?.quotes?.length > 0) {
      await Quote.deleteMany({ _id: { $in: hero.quotes } });
    }
    await anime.save();

    await Hero.deleteOne({ _id: id });
    if (hero.imageUrl) imgHelpers.removeImage(hero.imageUrl); //remove img from storage

    res.status(200).json({ message: "The Hero was removed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete hero" });
  }
};

const editHero = async (req, res, next) => {
  const heroId = req.params.id;
  const reqBody = req.body;
  const url = `${req.protocol}://${req.get("host")}`;
  const userId = req.userData.userId;

  try {
    const hero = await Hero.findById(heroId);
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    const nameRegex = { $regex: reqBody.name.trim(), $options: "i" };
    const existedHeroName = await Hero.findOne({
      animeId: reqBody.animeId,
      userId: userId,
      name: nameRegex,
    });
    if (existedHeroName) {
      return res
        .status(400)
        .json({ message: "This hero name exist in current anime" });
    }

    const prevImageUrl = hero.imageUrl;
    const nameForImage = reqBody.name.replace(/\s/g, "").toLowerCase();
    const imageMimeType = hero.imageUrl.split(".")[1];
    const newImgUrl = `${url}/images/${nameForImage}_${reqBody.animeId}.${imageMimeType}`;

    const newHero = {
      id: heroId,
      heroName: reqBody.name.trim(),
      imageUrl: newImgUrl,
      quotes: hero?.quotes || [],
    };

    if (reqBody.animeId !== hero.animeId) {
      const prevAnime = await Anime.findById(hero.animeId);
      const newAnime = await Anime.findById(reqBody.animeId);

      if (!prevAnime)
        return res
          .status(404)
          .json({ message: "Previous hero anime not found" });
      if (!newAnime)
        return res.status(404).json({ message: "New hero anime not found" });

      if (prevAnime && newAnime) {
        prevAnime.heroes = prevAnime.heroes.filter((h) => h.id !== heroId);
        newAnime.heroes.push(newHero);
        await newAnime.save();
        await prevAnime.save();
      }
    } else {
      const currentAnime = await Anime.findById(reqBody.animeId);
      if (!currentAnime) {
        return res.status(404).json({ message: "Hero anime not found" });
      }
      currentAnime.heroes = currentAnime.heroes.map((hero) => {
        if (hero.id === newHero.id) return newHero;
        return hero;
      });

      await currentAnime.save();
    }

    hero.name = reqBody.name.trim();
    hero.quotes = hero.quotes || [];
    hero.animeId = reqBody.animeId;
    hero.imageUrl = newImgUrl;

    if (prevImageUrl && newImgUrl) {
      imgHelpers.changeImageName(prevImageUrl, newImgUrl); // change current image name in storage
    }

    await hero.save();

    res.status(201).json({
      message: "The Hero was updated successfully",
      hero,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to edit hero" });
  }
};

const getHeroNames = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const list = await Hero.find({ userId: userId }).select("name");
    const heroesList = list.map((el) => {
      return { id: el.id, text: el.name };
    });
    res.status(200).json({ status: "Success", heroesList });
  } catch (err) {
    res.status(500).json({ message: "Unable to get heroes list" });
  }
};

module.exports = { getHeroes, addNewHero, deleteHero, editHero, getHeroNames };
