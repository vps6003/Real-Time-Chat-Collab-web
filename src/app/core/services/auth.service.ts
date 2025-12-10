import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import dotenv from 'dotenv';
import { AuthResponse, LoginCredentials, RegisterPayload } from '../../feature/auth/auth.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

dotenv.config();

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly Token_Key = 'vps_chat_room';
  private readonly API_KEY = process?.env['api_base_endpoint'];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login = (credentials: LoginCredentials): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/${this.API_KEY}/auth/login`,
      credentials
    );
  };

  register = (payload: RegisterPayload): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/${this.API_KEY}/auth/register`,
      payload
    );
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
