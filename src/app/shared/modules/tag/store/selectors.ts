import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../../../types/appState.interface';
import { TagsStateInterface } from '../type/tagsState.interface';

export const tagsFeatureSelector = (state: AppStateInterface): TagsStateInterface => state.tags;

export const tagsSelector = createSelector(
  tagsFeatureSelector,
  (tagsState: TagsStateInterface) => tagsState.data,
);

export const isLoadingSelector = createSelector(
  tagsFeatureSelector,
  (tagsState: TagsStateInterface) => tagsState.isLoading,
);

export const errorSelector = createSelector(
  tagsFeatureSelector,
  (tagsState: TagsStateInterface) => tagsState.error,
);
