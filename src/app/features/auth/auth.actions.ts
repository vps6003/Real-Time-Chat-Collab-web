import { createAction, props } from '@ngrx/store';
import { AuthResponse, LoginCredentials, RegisterPayload } from './auth.models';

//Login
export const login = createAction('[Auth] Login', props<{ credentials: LoginCredentials }>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: AuthResponse }>()
);

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

//Register
export const register = createAction('[Auth] Register', props<{ payload: RegisterPayload }>());

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: AuthResponse }>()
);

export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

//Auto Login from stored token (SSR-safe Handling later)
export const autoLogin = createAction('[Auth] Auto Login');

//Logout
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction('[Auth] Logout Failure');

export const clearAuthError = createAction('[Auth] Clear Error');
