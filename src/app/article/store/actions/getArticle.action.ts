import { createAction, props } from '@ngrx/store';

import { ArticleInterface } from '../../../shared/types/article.interface';
import { ActionTypes } from '../actionTypes';

export const getArticlesAction = createAction(ActionTypes.GET_ARTICLES, props<{ slug: string }>());

export const getArticlesSuccessAction = createAction(
  ActionTypes.GET_ARTICLES_SUCCESS,
  props<{ article: ArticleInterface }>(),
);

export const getArticlesFailureAction = createAction(ActionTypes.GET_ARTICLES_FAILURE);
