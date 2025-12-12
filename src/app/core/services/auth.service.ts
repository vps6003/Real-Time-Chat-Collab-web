import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthResponse, LoginCredentials, RegisterPayload } from '../../features/auth/auth.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly Token_Key = environment.TOKEN_KEY;
  private readonly API_KEY = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login = (credentials: LoginCredentials): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(`${this.API_KEY}/auth/login`, credentials);
  };

  register = (payload: RegisterPayload): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(`${this.API_KEY}/auth/register`, payload);
  };

  saveToken = (token: string): void => {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.Token_Key, token);
    }
  };

  getToken = (): string | null => {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.Token_Key);
    }
    return null;
  };

  clearToken = (): void => {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.Token_Key);
    }
  };
}
