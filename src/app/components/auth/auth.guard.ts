import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private _isAuth: boolean = false;
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this._authService
      .authStatusStream()
      .pipe(take(1))
      .subscribe((isAuth: boolean) => {
        this._isAuth = isAuth;
      });

    if (!this._isAuth) {
      this._router.navigate(['/login']);
    }

    return this._isAuth;
  }
}
