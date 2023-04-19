export interface IQuote {
  text: string;
  season: number;
  episode: number;
  time: string;
  author: IQuoteAuthor;
  animeId: string;
  id: string;
}

interface IQuoteAuthor {
  authorName: string;
  id: string;
}

export interface IGetQuotesResponse {
  status: string;
  quotes: IQuote[];
}
