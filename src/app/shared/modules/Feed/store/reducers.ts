import { Action, createReducer, on } from '@ngrx/store';

import { FeedStateInterface } from '../type/feedState.interface';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from './actions/getFeed.action';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

//create reducer for feed state
export const feedReducer = createReducer(
  initialState,
  on(getFeedAction, (state): FeedStateInterface => ({
    ...state,
    isLoading: true,
  })),
  on(getFeedSuccessAction, (state, action): FeedStateInterface => ({
    ...state,
    isLoading: false,
    data: action.feed,
  })),
  on(getFeedFailureAction, (state): FeedStateInterface => ({
    ...state,
    isLoading: false,
    error: 'Failed to fetch feed',
  })),
);

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action);
}
