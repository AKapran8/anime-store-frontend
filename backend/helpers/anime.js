const Hero = require("./../models/hero.model");

const imgHelpers = require("./image");

const copyAnimeHeroes = async (copiedAnime, duplicatedAnime, userId) => {
  const heroIds = copiedAnime.heroes.map((h) => h.id);
  const heroesList = await Hero.find({ _id: { $in: heroIds } });

  const heroes = heroesList.map((h) => {
    const imageUrl = imgHelpers.getNewImageName(
      h.imageUrl,
      h.name,
      duplicatedAnime._id
    );
    if (h.imageUrl && imageUrl) imgHelpers.createNewImage(h.imageUrl, imageUrl);
    return {
      name: h.name,
      animeId: duplicatedAnime._id,
      imageUrl,
      quotes: [],
      userId,
    };
  });

  const duplicatedHeroes = await Hero.create(heroes);
  const duplicatedAnimeHeroes = duplicatedHeroes.map((h) => {
    return { heroName: h.name, id: h._id, imageUrl: h.imageUrl };
  });

  return duplicatedAnimeHeroes;
};

const getHeroWithQuotes = (heroesList, quotesList) => {
  const heroes =
    heroesList?.map((h) => {
      h.id = h._id;
      const quotes = _getHeroQuotes(h.id, quotesList);
      return {
        id: h.id,
        name: h.name,
        animeId: h.animeId,
        imageUrl: h.imageUrl,
        quotes,
      };
    }) || [];

  return heroes;
};

const _getHeroQuotes = (heroId, quotesList) => {
  const quotes =
    quotesList
      ?.filter((q) => q?.author?.id === heroId)
      ?.map((q) => {
        const quote = {
          text: q.text,
          season: q.season,
          episode: q.episode,
          time: q.time,
        };
        return quote;
      }) || [];

  return quotes;
};

module.exports = {
  copyAnimeHeroes,
  getHeroWithQuotes,
};
