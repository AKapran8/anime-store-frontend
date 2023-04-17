import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAddEditAnime,
  IGetAnimeListResponse,
  IAddEditAnimeResponse,
  IDeleteAnimeResponse,
  IGetAnimeNamesResponse,
} from '../model.anime';

@Injectable()
export class AnimeService {
  constructor(private _http: HttpClient) {}

  public getAnimeList(): Observable<IGetAnimeListResponse> {
    return this._http.get<IGetAnimeListResponse>(
      'http://localhost:3000/api/anime'
    );
  }

  public addAnime(
    requestBody: IAddEditAnime
  ): Observable<IAddEditAnimeResponse> {
    return this._http.post<IAddEditAnimeResponse>(
      'http://localhost:3000/api/anime',
      requestBody
    );
  }

  public editAnime(
    requestBody: IAddEditAnime,
    id: string
  ): Observable<IAddEditAnimeResponse> {
    return this._http.put<IAddEditAnimeResponse>(
      `http://localhost:3000/api/anime/${id}`,
      requestBody
    );
  }

  public deleteAnime(id: string): Observable<IDeleteAnimeResponse> {
    return this._http.delete<IDeleteAnimeResponse>(
      `http://localhost:3000/api/anime/${id}`
    );
  }

  public getAnimeNames(): Observable<IGetAnimeNamesResponse> {
    return this._http.get<IGetAnimeNamesResponse>(
      'http://localhost:3000/api/anime/names'
    );
  }
}
