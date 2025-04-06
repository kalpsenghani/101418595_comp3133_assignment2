import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="signup-container">
      <h1 class="auth-heading">Employee Management System</h1>
      <mat-card class="signup-card">
        <mat-card-header>
          <mat-card-title>Sign Up</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" placeholder="Enter your username">
              <mat-error *ngIf="signupForm.get('username')?.hasError('required')">
                Username is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Enter your email">
              <mat-error *ngIf="signupForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="signupForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" placeholder="Enter your password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="signupForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="signupForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="signupForm.invalid" class="full-width">
              Sign Up
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="accent" routerLink="/login">Already have an account? Login</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .signup-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #00c9a7 0%, #6a1b9a 100%);
    }
    .signup-card {
      max-width: 500px;
      width: 90%;
      padding: 1.5rem;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border: none;
      outline: none;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
    mat-card-header {
      justify-content: center;
      margin-bottom: 1.5rem;
    }
    mat-card-title {
      font-size: 28px;
      margin: 0;
      color: var(--primary-dark);
      font-weight: 600;
    }
    mat-card-actions {
      display: flex;
      justify-content: center;
      padding: 0.75rem;
    }
    .auth-heading {
      font-size: 36px;
      color: white;
      margin-bottom: 2rem;
      text-align: center;
      font-weight: bold;
      font-family: 'Poppins', sans-serif;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    mat-form-field {
      transition: transform 0.3s ease;
    }
    mat-form-field:hover {
      transform: translateY(-2px);
    }
    button[mat-raised-button] {
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.5px;
      border-radius: 24px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    button[mat-raised-button]:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    button[mat-button] {
      font-weight: 500;
      transition: all 0.3s ease;
    }
    button[mat-button]:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `]
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Signup successful! Please login.', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // Check for specific error messages
          if (error.message && error.message.includes('duplicate key error')) {
            if (error.message.includes('email')) {
              this.snackBar.open('This email is already registered. Please use a different email or login.', 'Close', {
                duration: 5000,
                panelClass: ['error-snackbar']
              });
            } else if (error.message.includes('username')) {
              this.snackBar.open('This username is already taken. Please choose a different username.', 'Close', {
                duration: 5000,
                panelClass: ['error-snackbar']
              });
            } else {
              this.snackBar.open('An account with these details already exists. Please login instead.', 'Close', {
                duration: 5000,
                panelClass: ['error-snackbar']
              });
            }
          } else {
            this.snackBar.open(error.message || 'Signup failed. Please try again.', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        }
      });
    }
  }
}
