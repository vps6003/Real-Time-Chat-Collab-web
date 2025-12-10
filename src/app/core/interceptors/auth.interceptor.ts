import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Interceptor runs before every ongoning HTTP request
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Get the Token from local storage using get Token method from auth service
  const token = authService.getToken();

  // If token absent , return the request unchagned
  if (!token) {
    return next(req);
  }

  // Clone the request and add the Authorization header before handle the request
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
};
