export interface IAddEditHero {
  name: string;
  image?: File;
  animeId: string;
  imageUrl: string;
}

export interface IHero {
  id: string;
  name: string;
  imageUrl: string;
  quotes: string[];
  animeId: string;
  userId: string;
}

export interface IHeroForQuote {
  text: string;
  id: string;
  animeId: string;
}

export interface IAddEditHeroDialogData {
  type: 'add' | 'edit';
  heroId?: string;
  initialValue?: IAddEditHero;
}

export interface IAddEditHeroResponse {
  message: string;
  hero: IHero;
}

export interface IGetHeroesResponse {
  message: string;
  heroesList: IHero[];
}

export interface IGetHeroesNameResponse {
  message: string;
  heroesList: IHeroForQuote[];
}
