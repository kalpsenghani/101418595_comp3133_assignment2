import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="header">
      <div class="header-content">
        <div class="logo-section">
          <span class="logo-text">Employee Management System</span>
        </div>
        
        <div class="actions-section">
          <div class="user-section">
            <span class="username">{{ username }}</span>
            <button mat-icon-button (click)="logout()" aria-label="Logout" class="logout-button">
              <mat-icon>logout</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: var(--shadow-sm);
      background-color: var(--primary);
      color: white;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
    }
    
    .logo-section {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
    
    .logo-text {
      font-size: var(--font-size-lg);
      font-weight: 500;
      text-align: center;
    }
    
    .actions-section {
      display: flex;
      gap: var(--spacing-sm);
      align-items: center;
    }
    
    .user-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: 0 var(--spacing-sm);
    }
    
    .username {
      font-weight: 500;
      font-size: var(--font-size-md);
    }
    
    .logout-button {
      transition: transform var(--transition-normal);
    }
    
    .logout-button:hover {
      transform: translateY(-2px);
    }
  `]
})
export class HeaderComponent implements OnInit {
  username = '';
  email = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.user) {
      this.username = currentUser.user.username;
      this.email = currentUser.user.email;
    }
  }

  logout() {
    this.authService.logout();
  }
} 