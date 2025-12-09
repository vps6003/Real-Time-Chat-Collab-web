import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

//Feature key matches AppState.auth
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthUser = createSelector(selectAuthState, (state) => state.user);

export const selectAuthToken = createSelector(selectAuthState, (state) => state.token);

export const selectAuthLoading = createSelector(selectAuthState, (state) => state.loading);

export const selectAuthIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthError = createSelector(selectAuthState, (state) => state.error);
