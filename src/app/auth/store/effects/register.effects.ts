import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PersistanceService } from '../../../shared/services/persistance.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';

@Injectable()
export class RegisterEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private persistanceService = inject(PersistanceService);
  private router = inject(Router);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) =>
        this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return registerSuccessAction({ currentUser });
          }),
          catchError((errorsResponse: HttpErrorResponse) =>
            of(registerFailureAction({ errors: errorsResponse.error.errors })),
          ),
        ),
      ),
    ),
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );
}
