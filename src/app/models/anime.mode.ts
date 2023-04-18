import { IMessageResponse } from "./message-repsonse.model";

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
  heroes?: { id: string, heroName: string, imageUrl: string }[];
  quotes?: string[];
}

export interface IAnimeForHeroAndQuote {
  text: string;
  id: string;
}

export interface IGetAnimeListResponse {
  status: string;
  animeList: IServerAnime[];
}

export interface IGetAnimeNamesResponse extends IMessageResponse {
  animeList: IAnimeForHeroAndQuote[];
}

export interface IAddEditAnimeResponse extends IMessageResponse{
  anime: IServerAnime;
}

export interface IGetAnimeByIdResponst extends IMessageResponse {
  anime: IServerAnime;
}
