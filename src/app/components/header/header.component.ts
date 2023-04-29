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

  private _authStatusSub: Subscription | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._getAuthStatus();
  }

  private _getAuthStatus(): void {
    this.isAuthorized = this._authService.getIsAuth();
    this._authStatusSub = this._authService
      .authStatusStream()
      .subscribe((isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
        this._cdr.markForCheck();
      });
  }

  public logoutHandler(): void {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this._authStatusSub?.unsubscribe();
  }
}
