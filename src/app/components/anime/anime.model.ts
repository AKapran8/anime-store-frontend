export interface IAddEditAnime {
  name: string;
  nameUA: string;
  stars: number;
  time: number;
  genres: string;
  status: string;
  id?: string;
}

export interface IAnime {
  id: string;
  name: string;
  nameUA: string;
  stars: number;
  time: number;
  genres: string;
  status: string;
  userId: string;
  heroes?: { id: string; heroName: string }[];
}

export interface IAnimeById {
  id: string;
  genres: string;
  name: string;
  nameUA: string;
  stars: number;
  startDescr?: string;
  status: string;
  time: number;
  userId: string;
  heroes: IAnimeByIdHero[] | [];
}

export interface IAnimeByIdHero {
  id: string;
  name: string;
  animeId: string;
  imageUrl: string;
  quotes: IAnimeByIdQuote[] | [];
}

interface IAnimeByIdQuote {
  text: string;
  season: number;
  episode: number;
  time: string;
}

export interface IExpansionPanelData extends IAnime {
  timeText: string;
  starsDescr: string;
}

export interface IAnimeForHeroAndQuote {
  text: string;
  id: string;
}

export interface IGetAnimeListResponse {
  message: string;
  data: {
    totalElements: number;
    animeList: IAnime[];
  };
}

export interface IGetAnimeNamesListResponse {
  message: string;
  animeList: IAnimeForHeroAndQuote[];
}

export interface IAddEditAnimeResponse {
  message: string;
  anime: IAnime;
}

export interface IGetAnimeByIdResponst {
  message: string;
  anime: IAnimeById;
}
