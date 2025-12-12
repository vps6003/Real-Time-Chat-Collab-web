import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  // styleUrls : ["./login.component.scss"]
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  private store = inject(Store);
  constructor() {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.store.dispatch(
      AuthActions.login({ credentials: credentials as { email: string; password: string } })
    );
  }
}
