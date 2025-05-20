import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem(this.USER_KEY);
      if (storedUser) {
        try {
          this.currentUserSubject.next(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing stored user:', e);
          this.clearStoredUser();
        }
      }
    }
  }

  private clearStoredUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<{ user: User; token: string }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          if (typeof window !== 'undefined') {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          }
          this.currentUserSubject.next(response.user);
        }),
        map(response => response.user)
      );
  }

  logout(): void {
    this.clearStoredUser();
  }

  register(userData: Partial<User>): Observable<User> {
    return this.http.post<{ user: User; token: string }>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          if (typeof window !== 'undefined') {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          }
          this.currentUserSubject.next(response.user);
        }),
        map(response => response.user)
      );
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  refreshToken(): Observable<User> {
    return this.http.post<{ user: User; token: string }>(`${environment.apiUrl}/auth/refresh`, {})
      .pipe(
        tap(response => {
          if (typeof window !== 'undefined') {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          }
          this.currentUserSubject.next(response.user);
        }),
        map(response => response.user),
        catchError(error => {
          this.clearStoredUser();
          throw error;
        })
      );
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/auth/profile`, userData)
      .pipe(
        tap(user => {
          if (typeof window !== 'undefined') {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
        })
      );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/change-password`, {
      currentPassword,
      newPassword
    });
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/reset-password`, {
      token,
      newPassword
    });
  }
} 