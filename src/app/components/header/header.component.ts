import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from '../delete-dialog/delete-dialog.component';

interface IUserAuthData {
  isAuth: boolean;
  userName: string;
  userId: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthorized: boolean = false;
  public userName: string = '';
  private _userId: string = '';

  private _authInfoSub: Subscription | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getAuthStatus();
  }

  private _getAuthStatus(): void {
    const authData: IUserAuthData = this._authService.getUserAuth();

    this.isAuthorized = authData.isAuth;
    this.userName = authData.userName;
    this._userId = authData.userId;
    this._authInfoSub = this._authService
      .authInfoStream()
      .subscribe((authStreamData: IUserAuthData) => {
        this.isAuthorized = authStreamData.isAuth;
        this.userName = authStreamData.userName;
        this._userId = authStreamData.userId;
        this._cdr.markForCheck();
      });
  }

  public logoutHandler(): void {
    this._authService.logout();
  }

  public deleteUser(): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete ${this.userName}?`,
        type: 'USER',
        id: this._userId,
      } as IDeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) this._authService.logout();
    });
  }

  ngOnDestroy(): void {
    this._authInfoSub?.unsubscribe();
  }
}
