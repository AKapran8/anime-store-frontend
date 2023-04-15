export interface IAddHero {
  name: string;
  image: File;
  animeId: string;
  imageUrl: string;
}

export interface IEditHero {
  name: string;
  animeId: string;
  imageUrl: string;
}

export interface IHero {
  id: string;
  name: string;
  imageUrl: string;
  quotes: string[];
  animeId: string;
}
export interface IHeroTableData extends IHero {
  imagePath: string;
}
export interface IHeroForQuote {
  text: string;
  id: string;
}

export interface IAddEditHeroDialogData {
  type: 'add' | 'edit';
  heroId?: string;
  initialValue?: IEditHero;
}

export interface IAddEditHeroResponse {
  message: string;
  createdHero: IHero;
}
