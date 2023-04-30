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
  anime: IAnime;
}
