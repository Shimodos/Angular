import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { PersistanceService } from '../../../shared/services/persistance.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.action';

@Injectable()
export class GetCurrentUserEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private persistanceService = inject(PersistanceService);

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() =>
        {
          const token = this.persistanceService.get('accessToken');
          if (!token) {
            return of(getCurrentUserFailureAction());
          }
          return this.authService.getCurrentUser().pipe(
            map((currentUser: CurrentUserInterface) => {
              return getCurrentUserSuccessAction({ currentUser });
            }),
            catchError(() => of(getCurrentUserFailureAction())),
          );
        }
      ),
    ),
  );
}
