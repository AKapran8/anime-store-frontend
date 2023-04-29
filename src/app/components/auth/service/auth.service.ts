import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { IUser, ISignUpResponseData, ILoginResponseData } from '../user.model';
import { Router } from '@angular/router';

interface IAuthInfo {
  token: string;
  expiredDate: Date;
}
@Injectable()
export class AuthService {
  private _isAuth: boolean = false;
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

  public getIsAuth(): boolean {
    return this._isAuth;
  }

  public autoAuthUser(): void {
    const authInfo: IAuthInfo | null = this._getAuthData();
    if (!authInfo) return;

    const expiresTime: number = this._getExpiresTime(authInfo.expiredDate);
    if (!expiresTime) return;

    this._token = authInfo.token;
    this._setUserAuthData(expiresTime);
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
          const expiredPeriod: number = res.expiredAfter * 1000;
          const date: Date = new Date();
          const expiredDate: Date = new Date(date.getTime() + expiredPeriod);
          this._saveAuthData(res.token, expiredDate);

          this._setUserAuthData(expiredPeriod);
        }
      });
  }

  public logout(): void {
    this._token = null;
    this._authStatusListener.next(false);
    this._clearAuthData();
    this._isAuth = false;
    if (this._tokenTimer) clearTimeout(this._tokenTimer);
    if (!this._token) this._redirectToHomePage();
  }

  private _saveAuthData(token: string, expiredDate: Date): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiredDate', expiredDate.toISOString());
  }

  private _clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiredDate');
  }

  private _getAuthData(): IAuthInfo | null {
    const token: string | null = localStorage.getItem('token');
    const expiredDate: string | null = localStorage.getItem('expiredDate');

    if (!token || !expiredDate) return null;

    return {
      token,
      expiredDate: new Date(expiredDate),
    };
  }

  private _getExpiresTime(authDate: Date): number {
    const now: Date = new Date();
    return authDate.getTime() - now.getTime();
  }

  private _setAuthTimer(duration: number): void {
    this._tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private _setUserAuthData(expiredPeriod: number): void {
    this._authStatusListener.next(true);
    this._isAuth = true;
    this._setAuthTimer(expiredPeriod);
    this._redirectToHomePage();
  }

  private _redirectToHomePage(): void {
    this._router.navigate(['/']);
  }
}
