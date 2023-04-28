import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

import { IUser } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form: FormGroup | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._authStream();
  }

  private _authStream(): void {
    this._authService.authStatusStream().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) this._router.navigate(['']);
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

    const user: IUser = {
      email: this.form.value.email.trim(),
      password: this.form.value.password.trim(),
    };

    this._authService.login(user);
  }
}
