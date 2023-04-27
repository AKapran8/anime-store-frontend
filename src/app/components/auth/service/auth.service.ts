import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, ISignUpResponseData } from '../user.model';

@Injectable()
export class AuthService {
  private _url: string = 'http://localhost:3000/api/user';

  constructor(private _http: HttpClient) {}

  public signUp(requestBody: IUser): Observable<ISignUpResponseData> {
    return this._http.post<ISignUpResponseData>(
      `${this._url}/signup`,
      requestBody
    );
  }
}
