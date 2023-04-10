export interface IAddEditAnime {
  name: string;
  nameUA: string;
  stars: number;
  time: number;
  genres: string;
  status: string;
  id?: number;
}

export interface IAnime {
  id: number;
  name: string;
  nameUA: string;
  stars: number;
  time: number;
  genres: string;
  status: string;
}

export interface ITableData extends IAnime {
  timeText: string;
  starsDescr: string;
}
