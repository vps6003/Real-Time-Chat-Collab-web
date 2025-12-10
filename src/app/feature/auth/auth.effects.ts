import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthResponse } from './auth.models';

@Injectable()

// Marks this class as injectable so Angular can provide it.
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Login Effect
   * --------------------------------------------------------------------
   * 1. Listens for : AuthActions.login
   * 2. Calls AuthService.login() API
   * 3. IF Success -> dispatch LoginSuccess
   * 4. IF Failure -> dispatch LoginFailure
   */

  login$ = createEffect(() =>
    this.actions$.pipe(
      // Step - 1 : Only react to [Auth] Login action
      ofType(AuthActions.login),

      // Step - 2 : When login is dispatched, cal the login API
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          // Step - 3  : If API Succeeds -> dispatch LoginSuccess
          map((response: AuthResponse) => AuthActions.loginSuccess({ response })),

          // Step - 4 : If API Fails -> dispatch LoginFailure with error message
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

  /**
   * LOGIN SUCCESS SIDE EFFECT
   * ----------------------------------------------------
   * This effect does NOT dispatch a new action.
   * It simply performs extra work:
   *   - Save JWT token to localStorage
   *   - Redirect user to dashboard/home
   */
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        //Trigger when loginSuccess or registerSuccess action is dispatched
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),

        tap(({ response }) => {
          // Save JWT token to localStorage
          this.authService.saveToken(response.token);

          //Navigate to dashboard/home
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
