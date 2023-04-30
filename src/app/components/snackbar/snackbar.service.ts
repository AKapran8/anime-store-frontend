import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  public createErrorSnackbar(
    errorMessage: string,
    userDuration?: number
  ): void {
    const duration: number = userDuration || 2000;
    const errorClass: string[] = ['error-snackbar'];

    this._createSnackbar(errorMessage, duration, errorClass);
  }

  public createSuccessSnackbar(
    message: string,
    userDuration?: number
  ): void {
    const duration: number = userDuration || 2000;
    const successClass: string[] = ['success-snackbar'];

    this._createSnackbar(message, duration, successClass);
  }

  private _createSnackbar(
    message: string,
    duration: number,
    classNames: string[]
  ): void {
    this._snackBar.open(message, '', {
      duration: duration,
      panelClass: classNames,
    });
  }
}
