import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  IAddEditAnime,
  IAddEditAnimeResponse,
  IGetAnimeListResponse,
  IGetAnimeNamesListResponse,
  IGetAnimeByIdResponst,
} from 'src/app/components/anime/anime.model';

@Injectable()
export class AnimeService {
  private _url: string = `${environment.apiUrl}/anime`;
  constructor(private _http: HttpClient) {}

  public getAnimeList(
    pageSize: number,
    pageIndex: number,
    filterInput: string = ''
  ): Observable<IGetAnimeListResponse> {
    const utilsData = { pageSize, pageIndex, filterInput };
    return this._http.post<IGetAnimeListResponse>(this._url, {
      utilsData,
    });
  }

  public addAnime(
    requestBody: IAddEditAnime
  ): Observable<IAddEditAnimeResponse> {
    return this._http.post<IAddEditAnimeResponse>(
      `${this._url}/add`,
      requestBody
    );
  }

  public editAnime(
    requestBody: IAddEditAnime,
    id: string
  ): Observable<IAddEditAnimeResponse> {
    return this._http.put<IAddEditAnimeResponse>(
      `${this._url}/${id}`,
      requestBody
    );
  }

  public deleteAnime(id: string): Observable<{ message: string }> {
    return this._http.delete<{ message: string }>(`${this._url}/${id}`);
  }

  public getAnimeById(id: string): Observable<IGetAnimeByIdResponst> {
    return this._http.get<IGetAnimeByIdResponst>(`${this._url}/${id}`);
  }

  public getAnimeListNames(): Observable<IGetAnimeNamesListResponse> {
    return this._http.get<IGetAnimeNamesListResponse>(`${this._url}/names`);
  }

  public copyAnime(id: string): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(`${this._url}/copy`, { id });
  }
}
