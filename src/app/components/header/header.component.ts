import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthorized: boolean = false;
  public userName: string = '';

  private _authInfoSub: Subscription | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._getAuthStatus();
  }

  private _getAuthStatus(): void {
    const authData: { isAuth: boolean; userName: string } =
      this._authService.getIsAuth();

    this.isAuthorized = authData.isAuth;
    this.userName = authData.userName;
    this._authInfoSub = this._authService
      .authStatusStream()
      .subscribe((authStreamData: { isAuth: boolean; userName: string }) => {
        this.isAuthorized = authStreamData.isAuth;
        this.userName = authStreamData.userName;
        this._cdr.markForCheck();
      });
  }

  public logoutHandler(): void {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this._authInfoSub?.unsubscribe();
  }
}
