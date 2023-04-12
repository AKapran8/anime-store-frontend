import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetAnimeListResponse } from 'src/app/components/anime/helpers/model';

@Component({
  selector: 'app-unit-test',
  templateUrl: './unit-test.component.html',
  styleUrls: ['./unit-test.component.scss']
})
export class UnitTestComponent {

  constructor(private _http: HttpClient) { }

  public getAnimeList(): Observable<IGetAnimeListResponse> {
    return this._http.get<IGetAnimeListResponse>('http://localhost:3000/api/anime');
  }

}
