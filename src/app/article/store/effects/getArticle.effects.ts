import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ArticleService } from '../../../shared/services/article.service';
import { ArticleInterface } from '../../../shared/types/article.interface';
import {
  getArticlesAction,
  getArticlesFailureAction,
  getArticlesSuccessAction,
} from '../actions/getArticle.action';

@Injectable()
export class GetArticleEffects {
  private actions$ = inject(Actions);
  private articleService = inject(ArticleService);

  getArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticlesAction),
      switchMap(({ slug }) => {
        return this.articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticlesSuccessAction({ article });
          }),
          catchError(() => of(getArticlesFailureAction())),
        );
      }),
    ),
  );
}
