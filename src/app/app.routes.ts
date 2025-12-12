import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/components/login.component').then((m) => m.LoginComponent),
  },
];
