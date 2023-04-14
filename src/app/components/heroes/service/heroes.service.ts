import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private _http: HttpClient) { }

  public getHeroes(): Observable<any> {
    return this._http.get<any>(
      'http://localhost:3000/api/heroes'
    );
  }

  public getHeroesss(): Observable<any> {
    return this._http.get<any>(
      'http://localhost:3000/api/heroes/names'
    );
  }

  public addHero(
    requestBody: any
  ): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/api/heroes',
      requestBody
    );
  }

  public deleteHero(id: string): Observable<any> {
    return this._http.delete<any>(
      `http://localhost:3000/api/heroes/${id}`
    );
  }
}
