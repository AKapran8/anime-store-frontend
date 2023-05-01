import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { SnackbarService } from './snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _snackbarService: SnackbarService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string = 'Unkown error';
        if (error.error.message) errorMessage = error.error.message;
        this._snackbarService.createErrorSnackbar(errorMessage)
        return throwError(errorMessage);
      })
    );
  }
}
