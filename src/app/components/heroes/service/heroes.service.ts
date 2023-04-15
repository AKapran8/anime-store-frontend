import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddHero, IAddEditHeroResponse } from '../model.hero';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private _http: HttpClient) {}

  public getHeroes(): Observable<any> {
    return this._http.get<any>('http://localhost:3000/api/heroes');
  }

  public getHeroesList(): Observable<any> {
    return this._http.get<any>('http://localhost:3000/api/heroes/names');
  }

  public addHero(body: IAddHero): Observable<IAddEditHeroResponse> {
    const nameWithoutSpaces: string = body.name.replace(/\s+/g, '');
    const imageUrl: string = `${nameWithoutSpaces}_${body.animeId}`;

    const requestBody = new FormData();
    requestBody.append('name', body.name);
    requestBody.append('image', body.image, imageUrl);
    requestBody.append('animeId', body.animeId);
    requestBody.append('imageUrl', body.imageUrl);

    return this._http.post<IAddEditHeroResponse>(
      'http://localhost:3000/api/heroes',
      requestBody
    );
  }

  public deleteHero(id: string): Observable<any> {
    return this._http.delete<any>(`http://localhost:3000/api/heroes/${id}`);
  }
}
