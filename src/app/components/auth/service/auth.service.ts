import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { IUser, ISignUpResponseData, ILoginResponseData } from '../user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _token: string | null = null;
  private _url: string = 'http://localhost:3000/api/user';
  private _tokenTimer: any;

  private _authStatusListener = new Subject<boolean>();

  constructor(private _http: HttpClient, private _router: Router) {}

  public getToken(): string | null {
    return this._token;
  }

  public authStatusStream(): Observable<boolean> {
    return this._authStatusListener.asObservable();
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
      .subscribe((res: ILoginResponseData) => {
        this._token = res?.token;

        if (res.token) {
          this._tokenTimer = setTimeout(() => {
            this.logout();
          }, res.expiredAfter * 1000);

          this._authStatusListener.next(true);
          this._redirectToHomePage();
        }
      });
  }

  public logout(): void {
    this._token = null;
    this._authStatusListener.next(false);
    if (this._tokenTimer) clearTimeout(this._tokenTimer);
    if (!this._token) this._redirectToHomePage();
  }

  private _redirectToHomePage(): void {
    this._router.navigate(['/']);
  }
}
