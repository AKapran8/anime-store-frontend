export interface IAddEditQuote {
  text: string;
  season: number;
  episode: number;
  time: string;
  author: IQuoteAuthor;
}
export interface IQuote {
  text: string;
  season: number;
  episode: number;
  time: string;
  author: IQuoteAuthor;
  id: string;
  userId: string;
}

interface IQuoteAuthor {
  authorName: string;
  id: string;
}

export interface IGetQuotesResponse {
  message: string;
  quotes: IQuote[];
}

export interface IAddEditQuoteRespone {
  message: string;
  quote: IQuote;
}

export interface IAddEditQuoteDialogData {
  type: 'add' | 'edit';
  quoteId?: string;
  initialValue?: IAddEditQuote;
}
