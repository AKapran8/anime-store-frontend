export interface IAddEditAnime {
  name: string;
  nameUA: string;
  rating: number;
  time: number;
  genres: string;
  status: string;
  id?: string;
}

export interface IAnime {
  id: string;
  name: string;
  nameUA: string;
  rating: number;
  time: number;
  genres: string;
  status: string;
  userId: string;
  heroes?: { id: string; heroName: string }[];
}

export interface IAnimeElement extends IAnime {
  nameUA: string;
  rating: number;
  startDescr?: string;
  time: number;
  heroesList: IAnimeElementHero[] | [];
}

export interface IAnimeElementHero {
  id: string;
  name: string;
  animeId: string;
  imageUrl: string;
  quotes: IAnimeElementQuote[] | [];
}

interface IAnimeElementQuote {
  text: string;
  season: number;
  episode: number;
  time: string;
}

export interface IExpansionPanelData extends IAnime {
  timeText: string;
  ratingDescr: string;
}

export interface IAnimeForHero {
  text: string;
  id: string;
  existedHeroes: string[] | [];
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
  animeList: IAnimeForHero[];
}

export interface IAddEditAnimeResponse {
  message: string;
  anime: IAnime;
}

export interface IGetAnimeElementResponse {
  message: string;
  anime: IAnimeElement;
}
