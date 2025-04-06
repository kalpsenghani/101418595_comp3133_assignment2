import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../services/employee.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="details-container fade-in">
      <mat-card class="card">
        <mat-card-header>
          <div class="header-content">
            <button mat-icon-button (click)="goBack()" class="back-button">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <mat-card-title>Employee Details</mat-card-title>
          </div>
          <div class="header-actions">
            <button mat-raised-button color="primary" (click)="editEmployee()" class="action-button">
              <mat-icon>edit</mat-icon>
              Edit
            </button>
            <button mat-raised-button color="warn" (click)="deleteEmployee()" class="action-button">
              <mat-icon>delete</mat-icon>
              Delete
            </button>
          </div>
        </mat-card-header>

        <mat-card-content>
          <div class="profile-section">
            <div class="profile-image-container">
              <img [src]="employee?.employee_photo || 'assets/default-avatar.png'" 
                   [alt]="employee?.first_name"
                   class="profile-image">
            </div>
            <div class="profile-info">
              <h1>{{employee?.first_name}} {{employee?.last_name}}</h1>
              <p class="email">{{employee?.email}}</p>
              <div class="chips-container">
                <mat-chip-set>
                  <mat-chip color="primary">{{employee?.department}}</mat-chip>
                  <mat-chip color="accent">{{employee?.designation}}</mat-chip>
                </mat-chip-set>
              </div>
            </div>
          </div>

          <mat-divider></mat-divider>

          <div class="details-grid">
            <div class="detail-item">
              <mat-icon>person</mat-icon>
              <div class="detail-content">
                <label>Full Name</label>
                <p>{{employee?.first_name}} {{employee?.last_name}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon>email</mat-icon>
              <div class="detail-content">
                <label>Email</label>
                <p>{{employee?.email}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon>business</mat-icon>
              <div class="detail-content">
                <label>Department</label>
                <p>{{employee?.department}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon>work</mat-icon>
              <div class="detail-content">
                <label>Designation</label>
                <p>{{employee?.designation}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon>attach_money</mat-icon>
              <div class="detail-content">
                <label>Salary</label>
                <p>{{employee?.salary | currency}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon>wc</mat-icon>
              <div class="detail-content">
                <label>Gender</label>
                <p>{{employee?.gender}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon>event</mat-icon>
              <div class="detail-content">
                <label>Date of Joining</label>
                <p>{{employee?.date_of_joining | date}}</p>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .details-container {
      padding: var(--spacing-md);
      max-width: 1000px;
      margin: 0 auto;
    }
    .header-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }
    .header-actions {
      display: flex;
      gap: var(--spacing-md);
      margin-left: auto;
    }
    .action-button {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }
    .profile-section {
      display: flex;
      gap: var(--spacing-lg);
      margin: var(--spacing-lg) 0;
    }
    .profile-image-container {
      flex-shrink: 0;
    }
    .profile-image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: var(--shadow-sm);
    }
    .profile-info {
      flex: 1;
    }
    .profile-info h1 {
      margin: 0 0 var(--spacing-xs) 0;
      font-size: var(--font-size-xl);
      color: var(--text-primary);
    }
    .email {
      color: var(--text-secondary);
      margin: 0 0 var(--spacing-md) 0;
    }
    .chips-container {
      margin-top: var(--spacing-md);
    }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-md);
      margin-top: var(--spacing-lg);
    }
    .detail-item {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      background-color: var(--surface);
      box-shadow: var(--shadow-sm);
    }
    .detail-item mat-icon {
      color: var(--primary);
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
    .detail-content {
      flex: 1;
    }
    .detail-content label {
      display: block;
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-xs);
    }
    .detail-content p {
      margin: 0;
      font-size: var(--font-size-md);
      font-weight: 500;
    }
    mat-divider {
      margin: var(--spacing-md) 0;
    }
  `]
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.loadEmployee(employeeId);
    }
  }

  loadEmployee(id: string) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employee = employee;
      },
      error: (error) => {
        this.snackBar.open('Error loading employee: ' + error.message, 'Close', { duration: 3000 });
        this.goBack();
      }
    });
  }

  editEmployee() {
    if (this.employee) {
      this.router.navigate(['/employees/edit', this.employee.id]);
    }
  }

  deleteEmployee() {
    if (this.employee && confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          this.snackBar.open('Employee deleted successfully', 'Close', { duration: 3000 });
          this.goBack();
        },
        error: (error) => {
          this.snackBar.open('Error deleting employee: ' + error.message, 'Close', { duration: 3000 });
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
