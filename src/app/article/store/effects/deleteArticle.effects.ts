import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { ArticleService } from '../../services/article.services';
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction,
} from '../actions/deleteArticle.action';

@Injectable()
export class DeleteArticleEffects {
  private actions$ = inject(Actions);
  private articleService = inject(ArticleService);
  private router = inject(Router);

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({ slug }) => {
        return this.articleService.deleteArticle(slug).pipe(
          map(() => {
            return deleteArticleSuccessAction();
          }),
          catchError(() => of(deleteArticleFailureAction())),
        );
      }),
    ),
  );

  redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteArticleSuccessAction),
        tap(() => {
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );
}
