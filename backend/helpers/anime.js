const getAnimeHeroesWithQuotes = (heroesList, quotesList) => {
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
  getAnimeHeroesWithQuotes,
};
