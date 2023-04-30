import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IGetHeroesResponse,
  IGetHeroesNameResponse,
  IAddEditHero,
  IAddEditHeroResponse,
} from 'src/app/components/heroes/hero.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeroesService {
  private _url: string = `${environment.apiUrl}/heroes`;
  constructor(private _http: HttpClient) {}

  public getHeroes(): Observable<IGetHeroesResponse> {
    return this._http.get<IGetHeroesResponse>(this._url);
  }

  public getHeroesListForQuote(): Observable<IGetHeroesNameResponse> {
    return this._http.get<IGetHeroesNameResponse>(`${this._url}/names`);
  }

  public addHero(body: IAddEditHero): Observable<IAddEditHeroResponse> {
    const nameWithoutSpaces: string = body.name.replace(/\s+/g, '');
    const imageUrl: string = `${nameWithoutSpaces}_${body.animeId}`;

    const requestBody = new FormData();
    requestBody.append('name', body.name);
    requestBody.append('animeId', body.animeId);
    requestBody.append('imageUrl', body.imageUrl);
    if (body.image) requestBody.append('image', body.image, imageUrl);

    return this._http.post<IAddEditHeroResponse>(this._url, requestBody);
  }

  public deleteHero(id: string): Observable<{ message: string }> {
    return this._http.delete<{ message: string }>(`${this._url}/${id}`);
  }

  public editHero(
    requestBody: IAddEditHero,
    id: string
  ): Observable<IAddEditHeroResponse> {
    return this._http.put<IAddEditHeroResponse>(
      `${this._url}/${id}`,
      requestBody
    );
  }
}
