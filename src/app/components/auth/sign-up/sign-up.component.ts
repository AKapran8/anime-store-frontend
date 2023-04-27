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

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form: FormGroup | null = null;

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

  public signUpHandler(): void {
    if (!this.form?.valid) return;

    const user: IUser = {
      email: this.form.value.email.trim(),
      password: this.form.value.password.trim(),
    };

    this._authService
      .signUp(user)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
      });
  }
}
