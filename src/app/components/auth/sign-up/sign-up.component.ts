import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { take } from 'rxjs/operators';
import { IUser } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  public isLoading: boolean = false;
  form: FormGroup | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _router: Router
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

  public signUpHandler(): void {
    if (!this.form?.valid) return;

    const user: IUser = {
      email: this.form.value.email.trim(),
      password: this.form.value.password.trim(),
    };
    this.isLoading = true;
    this._cdr.markForCheck();

    this._authService
      .signUp(user)
      .pipe(take(1))
      .subscribe(() => {
        this._router.navigate(['login']);
      });
  }
}
