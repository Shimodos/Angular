import { routerNavigationAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';

import { ArticleStateInterface } from '../type/articleState.interface';
import {
  getArticlesAction,
  getArticlesFailureAction,
  getArticlesSuccessAction,
} from './actions/getArticle.action';

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

//create reducer for feed state
export const articleReducer = createReducer(
  initialState,
  on(getArticlesAction, (state): ArticleStateInterface => ({
    ...state,
    isLoading: true,
  })),
  on(getArticlesSuccessAction, (state, action): ArticleStateInterface => ({
    ...state,
    isLoading: false,
    data: action.article,
  })),
  on(getArticlesFailureAction, (state): ArticleStateInterface => ({
    ...state,
    isLoading: false,
    error: 'Failed to fetch feed',
  })),
  on(routerNavigationAction, (): ArticleStateInterface => initialState),
);

export function reducers(state: ArticleStateInterface, action: Action) {
  return articleReducer(state, action);
}
