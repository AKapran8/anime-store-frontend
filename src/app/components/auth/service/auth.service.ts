import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { IUser, ISignUpResponseData, ILoginResponseData } from '../user.model';

@Injectable()
export class AuthService {
  private _token: string = '';
  private _url: string = 'http://localhost:3000/api/user';

  constructor(private _http: HttpClient) {}

  public getToken(): string {
    return this._token;
  }

  public signUp(requestBody: IUser): Observable<ISignUpResponseData> {
    return this._http.post<ISignUpResponseData>(
      `${this._url}/signup`,
      requestBody
    );
  }

  public login(requestBody: IUser): Subscription {
    return this._http
      .post<ILoginResponseData>(`${this._url}/login`, requestBody)
      .pipe(take(1))
      .subscribe((res: { token: string }) => {
        this._token = res?.token;
        console.log(this._token);
      });
  }
}
