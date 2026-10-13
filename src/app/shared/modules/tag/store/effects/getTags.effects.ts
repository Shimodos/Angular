import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { PopularTagType } from '../../../../types/PopularTagType.type';
import { TagService } from '../../services/tag.service';
import {
  getTagsAction,
  getTagsFailureAction,
  getTagsSuccessAction,
} from '../actions/getTags.action';

@Injectable()
export class GetTagsEffects {
  private actions$ = inject(Actions);
  private tagService = inject(TagService);

  getTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTagsAction),
      switchMap(() => {
        return this.tagService.getTags().pipe(
          map((tags: PopularTagType[]) => {
            return getTagsSuccessAction({ tags });
          }),
          catchError(() => of(getTagsFailureAction())),
        );
      }),
    ),
  );
}
