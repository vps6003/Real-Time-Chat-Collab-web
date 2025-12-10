import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthResponse } from './auth.models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // LOGIN EFFECT
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response: AuthResponse) => AuthActions.loginSuccess({ response })),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error?.error?.message ?? error?.message ?? 'Login Failed!',
              })
            )
          )
        )
      )
    )
  );

  // REGISTER EFFECT
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ payload }) =>
        this.authService.register(payload).pipe(
          map((response: AuthResponse) => AuthActions.registerSuccess({ response })),
          catchError((error) =>
            of(
              AuthActions.registerFailure({
                error: error?.error?.message ?? error?.message ?? 'Registration Failed!',
              })
            )
          )
        )
      )
    )
  );

  // LOGIN SUCCESS SIDE EFFECT
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(({ response }) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  // LOGOUT EFFECT
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        this.authService.clearToken();
        this.router.navigate(['/auth/login']);
        return AuthActions.logoutSuccess();
      })
    )
  );

  // AUTO LOGIN EFFECT
  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const token = this.authService.getToken();

        if (!token) {
          return AuthActions.logoutSuccess();
        }

        const response: AuthResponse = {
          token,
          user: {
            id: 'unknown',
            username: 'Unknown',
            email: '',
            roles: [],
          },
        };

        return AuthActions.loginSuccess({ response });
      })
    )
  );
}
