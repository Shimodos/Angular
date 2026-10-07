import { Action, createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from '../types/authState.interface';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/getCurrentUser.action';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.action';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action';

const iniotialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

const authReducer = createReducer(
  iniotialState,
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
  })),

  on(registerSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    currentUser: action.currentUser,
    isLoggedIn: true,
    validationErrors: null,
  })),

  on(registerFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
  })),

  on(loginAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
  })),

  on(loginSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    currentUser: action.currentUser,
    isLoggedIn: true,
    validationErrors: null,
  })),

  on(loginFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
  })),

  //Get Curren User
  on(getCurrentUserAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    isLoading: true,
    isLoggedIn: false,
    validationErrors: null,
  })),

  on(getCurrentUserSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isLoading: false,
    currentUser: action.currentUser,
    isLoggedIn: true,
  })),

  on(getCurrentUserFailureAction, (state): AuthStateInterface => ({
    ...state,
    isLoading: false,
    currentUser: null,
    isLoggedIn: false,
    validationErrors: null,
  })),
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
