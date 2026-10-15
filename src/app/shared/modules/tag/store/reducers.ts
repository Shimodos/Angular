import { Action, createReducer, on } from '@ngrx/store';

import { TagsStateInterface } from '../type/tagsState.interface';
import {
  getTagsAction,
  getTagsFailureAction,
  getTagsSuccessAction,
} from './actions/getTags.action';

const initialState: TagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

//create reducer for tags state
export const tagsReducer = createReducer(
  initialState,
  on(getTagsAction, (state): TagsStateInterface => ({
    ...state,
    isLoading: true,
  })),
  on(getTagsSuccessAction, (state, action): TagsStateInterface => ({
    ...state,
    isLoading: false,
    data: action.tags,
  })),
  on(getTagsFailureAction, (state): TagsStateInterface => ({
    ...state,
    isLoading: false,
    error: 'Failed to fetch tags',
  })),
);

export function reducers(state: TagsStateInterface, action: Action) {
  return tagsReducer(state, action);
}
