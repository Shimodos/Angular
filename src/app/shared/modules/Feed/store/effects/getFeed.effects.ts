import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { FeedService } from '../../services/feed.service';
import { GetFeedResponseInterface } from '../../type/getFeedResponse.interface';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../actions/getFeed.action';

@Injectable()
export class GetFeedEffects {
  private actions$ = inject(Actions);
  private feedService = inject(FeedService);

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({ feed });
          }),
          catchError(() => of(getFeedFailureAction())),
        );
      }),
    ),
  );
}
