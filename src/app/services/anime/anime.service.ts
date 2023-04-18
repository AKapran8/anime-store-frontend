import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessageResponse } from 'src/app/models/message-repsonse.model';
import {
  IAddEditAnime,
  IAddEditAnimeResponse,
  IGetAnimeListResponse,
  IGetAnimeNamesResponse,
  IGetAnimeByIdResponst,
} from 'src/app/models/anime.mode';

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

  public deleteAnime(id: string): Observable<IMessageResponse> {
    return this._http.delete<IMessageResponse>(
      `http://localhost:3000/api/anime/${id}`
    );
  }

  public getAnimeById(id: string): Observable<IGetAnimeByIdResponst> {
    return this._http.get<IGetAnimeByIdResponst>(
      `http://localhost:3000/api/anime/${id}`
    );
  }
}
