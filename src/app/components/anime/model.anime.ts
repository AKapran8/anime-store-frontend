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
  heroes?: { id: string, heroName: string }[];
  quotes?: string[];
}

export interface ITableData extends IAnime {
  timeText: string;
  starsDescr: string;
}

export interface IServerAnime {
  _id: string;
  name: string;
  nameUA: string;
  stars: number;
  time: number;
  genres: string;
  status: string;
  heroes?: { id: string, heroName: string }[];
  quotes?: string[];
}

export interface IAnimeForHeroAndQuote {
  text: string;
  id: string;
}
export interface IGetAnimeListResponse {
  status: string;
  data: IServerAnime[];
}

export interface IAddEditAnimeResponse {
  message: string;
}

export interface IGetAnimeNamesResponse {
  status: string;
  data: IAnimeForHeroAndQuote[];
}

export interface IDeleteAnimeResponse extends IAddEditAnimeResponse {}
