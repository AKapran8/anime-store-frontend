import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IAddEditQuote, IAddEditQuoteRespone, IGetQuotesResponse } from '../quote.model';

@Injectable()
export class QuotesService {
  constructor(private _http: HttpClient) {}

  public getQuotes(): Observable<IGetQuotesResponse> {
    return this._http.get<IGetQuotesResponse>(
      'http://localhost:3000/api/quotes'
    );
  }

  public addQuote(body: IAddEditQuote): Observable<IAddEditQuoteRespone> {
    return this._http.post<IAddEditQuoteRespone>(
      'http://localhost:3000/api/quotes',
      body
    );
  }

  public deleteQuote(id: string): Observable<{ message: string }> {
    return this._http.delete<{ message: string }>(
      `http://localhost:3000/api/quotes/${id}`
    );
  }

  public editQuote(
    requestBody: IAddEditQuote,
    id: string
  ): Observable<IAddEditQuoteRespone> {
    return this._http.put<IAddEditQuoteRespone>(
      `http://localhost:3000/api/quotes/${id}`,
      requestBody
    );
  }
}
