import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PersistenceService } from '../../../shared/services/persistance.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.action';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private persistanceService = inject(PersistenceService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) =>
        this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorsResponse: HttpErrorResponse) =>
            of(loginFailureAction({ errors: errorsResponse.error.errors })),
          ),
        ),
      ),
    ),
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );
}
