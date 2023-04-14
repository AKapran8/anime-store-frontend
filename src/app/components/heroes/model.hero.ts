export interface IAddEditHero {
  name: string;
  image: string;
}

export interface IHero {
  id: string;
  name: string;
  image: string;
  quotes: string[];
  animeId: string;
}

export interface IHeroForQuote {
  text: string;
  id: string;
}

