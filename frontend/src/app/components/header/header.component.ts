import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <mat-toolbar class="header">
      <div class="header-content">
        <div class="logo-section">
          <mat-icon class="logo-icon">business</mat-icon>
          <span class="logo-text">Employee Management System</span>
        </div>
        
        <div class="actions-section">
          <div class="user-section">
            <div class="user-info">
              <mat-icon class="user-icon">account_circle</mat-icon>
              <span class="username">{{ username }}</span>
            </div>
            <button mat-icon-button 
                    (click)="logout()" 
                    class="logout-button"
                    matTooltip="Logout">
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
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: white;
      box-shadow: var(--shadow-md);
      padding: 0;
      height: 64px;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
    }
    
    .logo-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    
    .logo-section:hover {
      transform: translateY(-2px);
    }
    
    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    
    .logo-text {
      font-size: var(--font-size-lg);
      font-weight: 500;
      background: linear-gradient(45deg, #fff, #e0e0e0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .actions-section {
      display: flex;
      gap: var(--spacing-md);
      align-items: center;
    }
    
    .user-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm);
      border-radius: var(--radius-lg);
      transition: all 0.3s ease;
    }
    
    .user-section:hover {
      transform: translateY(-2px);
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }
    
    .user-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: var(--accent);
    }
    
    .username {
      font-weight: 500;
      font-size: var(--font-size-md);
      color: white;
    }
    
    .logout-button {
      transition: all 0.3s ease;
    }
    
    .logout-button:hover {
      transform: rotate(90deg);
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    @media (max-width: 600px) {
      .logo-text {
        display: none;
      }
      
      .username {
        display: none;
      }
      
      .user-section {
        padding: var(--spacing-xs);
      }
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