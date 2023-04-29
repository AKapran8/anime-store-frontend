import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../service/auth.service';

import { ILoginUser } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public form: FormGroup | null = null;

  private _authUserSub: Subscription | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._getUserAuth();
    this._initForm();
  }

  private _getUserAuth(): void {
    this._authUserSub = this._authService.authInfoStream().subscribe((res) => {
      this.isLoading = false;
      this._cdr.markForCheck();
    });
  }

  private _initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public loginHandler(): void {
    if (!this.form?.valid) return;

    this.isLoading = true;

    const user: ILoginUser = {
      email: this.form.value.email.trim(),
      password: this.form.value.password.trim(),
    };

    this._authService.login(user);

    this._cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this._authUserSub?.unsubscribe();
  }
}
