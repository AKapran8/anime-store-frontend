import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private _http: HttpClient) { }

  public getAnimeList(): Observable<any> {
    return this._http.get('http://localhost:3000/api/anime')
  }

  public addAnime(requestBody: any): Observable<any> {
    return this._http.post('http://localhost:3000/api/anime', requestBody)
  }
}
