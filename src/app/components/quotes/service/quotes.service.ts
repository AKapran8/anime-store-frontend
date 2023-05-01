import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  IAddEditQuote,
  IAddEditQuoteRespone,
  IGetQuotesResponse,
} from '../quote.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuotesService {
  private _url: string = `${environment.apiUrl}/quotes`;

  constructor(private _http: HttpClient) {}

  public getQuotes(): Observable<IGetQuotesResponse> {
    return this._http.get<IGetQuotesResponse>(this._url);
  }

  public addQuote(body: IAddEditQuote): Observable<IAddEditQuoteRespone> {
    return this._http.post<IAddEditQuoteRespone>(this._url, body);
  }

  public deleteQuote(id: string): Observable<{ message: string }> {
    return this._http.delete<{ message: string }>(`${this._url}/${id}`);
  }

  public editQuote(
    requestBody: IAddEditQuote,
    id: string
  ): Observable<IAddEditQuoteRespone> {
    return this._http.put<IAddEditQuoteRespone>(
      `${this._url}/${id}`,
      requestBody
    );
  }
}
