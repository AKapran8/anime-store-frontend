import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { ISignUpUser } from '../user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public form: FormGroup | null = null;

  private _authUserSub: Subscription | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getUserAuth();
  }

  private _getUserAuth(): void {
    this._authUserSub = this._authService.authInfoStream().subscribe((res) => {
      this.isLoading = false;
      this._cdr.markForCheck();
    });
  }

  private _initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public signUpHandler(): void {
    if (!this.form?.valid) return;

    const user: ISignUpUser = {
      name: this.form.value.name.trim(),
      email: this.form.value.email.trim(),
      password: this.form.value.password,
    };
    this.isLoading = true;
    this._cdr.markForCheck();

    this._authService.signUp(user);
  }

  ngOnDestroy(): void {
    this._authUserSub?.unsubscribe();
  }
}
