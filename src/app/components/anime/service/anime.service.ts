import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAddEditAnime,
  IGetAnimeListResponse,
  IAddEditAnimeResponse,
  IDeleteAnimeResponse,
} from '../model';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private _http: HttpClient) {}

  public getAnimeList(): Observable<IGetAnimeListResponse> {
    return this._http.get<IGetAnimeListResponse>('http://localhost:3000/anime');
  }

  public addAnime(
    requestBody: IAddEditAnime
  ): Observable<IAddEditAnimeResponse> {
    return this._http.post<IAddEditAnimeResponse>(
      'http://localhost:3000/anime',
      requestBody
    );
  }

  public editAnime(
    requestBody: IAddEditAnime,
    id: number
  ): Observable<IAddEditAnimeResponse> {
    return this._http.put<IAddEditAnimeResponse>(
      `http://localhost:3000/anime/${id}`,
      requestBody
    );
  }

  public deleteAnime(id: number): Observable<IDeleteAnimeResponse> {
    return this._http.delete<IDeleteAnimeResponse>(
      `http://localhost:3000/anime/${id}`
    );
  }
}
