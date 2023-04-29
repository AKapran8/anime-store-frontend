import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  ISignUpUser,
  ISignUpResponseData,
  ILoginResponseData,
  ILoginUser,
} from '../user.model';
import { Router } from '@angular/router';

interface IAuthInfo {
  token: string;
  expiredDate: Date;
  userName: string;
  userId: string;
}

interface IAuthUserInfo {
  isAuth: boolean;
  userName: string;
  userId: string;
}
@Injectable()
export class AuthService {
  private _isAuth: boolean = false;
  private _token: string | null = null;
  private _userName: string = '';
  private _userId: string = '';
  private _url: string = 'http://localhost:3000/api/user';
  private _tokenTimer: any;

  private _authStatusListener = new Subject<IAuthUserInfo>();

  constructor(private _http: HttpClient, private _router: Router) {}

  public getToken(): string | null {
    return this._token;
  }

  public authStatusStream(): Observable<IAuthUserInfo> {
    return this._authStatusListener.asObservable();
  }

  public getIsAuth(): IAuthUserInfo {
    return {
      isAuth: this._isAuth,
      userName: this._userName,
      userId: this._userId,
    };
  }

  public autoAuthUser(): void {
    const authInfo: IAuthInfo | null = this._getAuthData();
    if (!authInfo) return;

    const expiresTime: number = this._getExpiresTime(authInfo.expiredDate);
    if (!expiresTime) return;

    this._token = authInfo.token;
    this._setUserAuthData(expiresTime, authInfo.userName, authInfo.userId);
  }

  public signUp(requestBody: ISignUpUser): Observable<ISignUpResponseData> {
    return this._http.post<ISignUpResponseData>(
      `${this._url}/signup`,
      requestBody
    );
  }

  public login(requestBody: ILoginUser): Subscription {
    return this._http
      .post<ILoginResponseData>(`${this._url}/login`, requestBody)
      .pipe(take(1))
      .subscribe((res: ILoginResponseData) => {
        this._token = res.data.token;

        if (this._token) {
          const expiredPeriod: number = res.data.expiredAfter * 1000;
          const date: Date = new Date();
          const expiredDate: Date = new Date(date.getTime() + expiredPeriod);
          this._saveAuthData(
            res.data.token,
            expiredDate,
            res.data.userName,
            res.data.userId
          );
          this._setUserAuthData(
            expiredPeriod,
            res.data.userName,
            res.data.userId
          );
          this._redirectToHomePage();
        }
      });
  }

  public logout(): void {
    this._token = null;
    this._authStatusListener.next({ isAuth: false, userName: '', userId: '' });
    this._clearAuthData();
    this._isAuth = false;
    this._userName = '';
    this._userId = '';
    if (this._tokenTimer) clearTimeout(this._tokenTimer);
    if (!this._token) this._redirectToHomePage();
  }

  private _saveAuthData(
    token: string,
    expiredDate: Date,
    userName: string,
    userId: string
  ): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiredDate', expiredDate.toISOString());
    localStorage.setItem('name', userName);
    localStorage.setItem('userId', userId);
  }

  private _clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiredDate');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
  }

  private _getAuthData(): IAuthInfo | null {
    const token: string | null = localStorage.getItem('token');
    const expiredDate: string | null = localStorage.getItem('expiredDate');
    const userName: string | null = localStorage.getItem('name');
    const userId: string | null = localStorage.getItem('userId');

    if (!token || !expiredDate || !userName || !userId) return null;

    return {
      token,
      expiredDate: new Date(expiredDate),
      userName,
      userId,
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

  private _setUserAuthData(
    expiredPeriod: number,
    userName: string,
    userId: string
  ): void {
    this._authStatusListener.next({ isAuth: true, userName, userId });
    this._isAuth = true;
    this._setAuthTimer(expiredPeriod);
    this._userName = userName;
    this._userId = userId;
  }

  private _redirectToHomePage(): void {
    this._router.navigate(['/']);
  }
}
