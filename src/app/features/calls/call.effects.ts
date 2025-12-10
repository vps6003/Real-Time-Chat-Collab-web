import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class CallEffects {
  constructor(private actions$: Actions) {}
}
