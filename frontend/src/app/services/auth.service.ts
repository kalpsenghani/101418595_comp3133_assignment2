import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from './graphql.service';
import { isPlatformBrowser } from '@angular/common';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    created_at: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthResponse | null>;
  public currentUser: Observable<AuthResponse | null>;
  private isBrowser: boolean;

  constructor(
    private graphqlService: GraphqlService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Initialize from localStorage if available
    let storedUser = null;
    if (this.isBrowser) {
      const storedUserStr = localStorage.getItem('currentUser');
      if (storedUserStr) {
        try {
          storedUser = JSON.parse(storedUserStr);
        } catch (e) {
          console.error('Error parsing stored user data', e);
          localStorage.removeItem('currentUser');
        }
      }
    }
    
    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.graphqlService.login(email, password);
  }

  signup(userData: { username: string; email: string; password: string }): Observable<AuthResponse> {
    return this.graphqlService.signup(userData);
  }

  handleAuthResponse(response: AuthResponse): void {
    if (response && response.token) {
      if (this.isBrowser) {
        localStorage.setItem('currentUser', JSON.stringify(response));
      }
      this.currentUserSubject.next(response);
    }
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
  
  // Check if the token is valid and not expired
  isTokenValid(): boolean {
    if (!this.currentUserValue || !this.currentUserValue.token) {
      return false;
    }
    
    // Simple check - in a real app, you would decode the JWT and check expiration
    return true;
  }
}
