import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../service/auth.service';

import { IUser } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public isLoading: boolean = false;
  public form: FormGroup | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._initForm();
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

    const user: IUser = {
      email: this.form.value.email.trim(),
      password: this.form.value.password.trim(),
    };

    this._authService.login(user);
    this._cdr.markForCheck();
  }
}
