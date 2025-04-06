import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatChipsModule,
    MatTooltipModule
  ],
  template: `
    <div class="app-container" [class.light-theme]="isLightTheme" [class.dark-theme]="!isLightTheme">
      <app-header *ngIf="isAuthenticated && !isAuthPage"></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--background);
      color: var(--text-primary);
      transition: background-color var(--transition-normal), color var(--transition-normal);
    }
    
    .main-content {
      flex: 1;
      padding: var(--spacing-md);
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Employee Management System';
  isLightTheme = true;
  isAuthenticated = false;
  isAuthPage = false;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.themeService.theme$.subscribe(theme => {
      this.isLightTheme = theme === 'light';
    });
    
    this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
      
      // If not authenticated and not on an auth page, redirect to login
      if (!this.isAuthenticated && !this.isAuthPage) {
        this.router.navigate(['/login']);
      }
    });
    
    // Check if current route is login or signup
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isAuthPage = event.url === '/login' || event.url === '/signup';
      
      // If authenticated and on an auth page, redirect to employees
      if (this.isAuthenticated && this.isAuthPage) {
        this.router.navigate(['/employees']);
      }
    });
  }
}
