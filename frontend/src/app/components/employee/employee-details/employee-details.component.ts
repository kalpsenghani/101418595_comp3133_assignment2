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
        <div class="header-section">
          <div class="header-content">
            <div class="header-title">
              <button mat-icon-button (click)="goBack()" class="back-button" matTooltip="Go back">
                <mat-icon>arrow_back</mat-icon>
              </button>
              <mat-card-title>
                <mat-icon class="header-icon">person</mat-icon>
                Employee Details
              </mat-card-title>
            </div>
            <div class="header-actions">
              <button mat-raised-button color="primary" (click)="editEmployee()" class="action-button edit-button">
                <mat-icon>edit</mat-icon>
                Edit
              </button>
              <button mat-raised-button color="warn" (click)="deleteEmployee()" class="action-button delete-button">
                <mat-icon>delete</mat-icon>
                Delete
              </button>
            </div>
          </div>
        </div>

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
                  <mat-chip color="primary" class="department-chip">{{employee?.department}}</mat-chip>
                  <mat-chip color="accent" class="designation-chip">{{employee?.designation}}</mat-chip>
                </mat-chip-set>
              </div>
            </div>
          </div>

          <mat-divider></mat-divider>

          <div class="details-grid">
            <div class="detail-item">
              <mat-icon class="detail-icon">person</mat-icon>
              <div class="detail-content">
                <label>Full Name</label>
                <p>{{employee?.first_name}} {{employee?.last_name}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon class="detail-icon">email</mat-icon>
              <div class="detail-content">
                <label>Email</label>
                <p>{{employee?.email}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon class="detail-icon">business</mat-icon>
              <div class="detail-content">
                <label>Department</label>
                <p>{{employee?.department}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon class="detail-icon">work</mat-icon>
              <div class="detail-content">
                <label>Designation</label>
                <p>{{employee?.designation}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon class="detail-icon">attach_money</mat-icon>
              <div class="detail-content">
                <label>Salary</label>
                <p>{{employee?.salary | currency}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon class="detail-icon">wc</mat-icon>
              <div class="detail-content">
                <label>Gender</label>
                <p>{{employee?.gender}}</p>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon class="detail-icon">event</mat-icon>
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
      padding: 16px;
      height: calc(100vh - 32px);
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    
    .card {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: var(--surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      overflow: visible;
      min-width: 800px;
    }
    
    .header-section {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      padding: 16px;
      color: white;
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    
    .header-title {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .header-icon {
      margin-right: 8px;
      font-size: 24px;
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
    
    .back-button {
      color: white;
      transition: transform 0.3s ease;
    }
    
    .back-button:hover {
      transform: translateX(-4px);
    }
    
    mat-card-title {
      font-size: 20px;
      margin: 0;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    
    .header-actions {
      display: flex;
      gap: 16px;
    }
    
    .action-button {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 40px;
      border-radius: var(--radius-md);
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .edit-button {
      background-color: var(--primary);
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .edit-button:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    
    .delete-button {
      background-color: var(--danger);
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .delete-button:hover {
      background-color: var(--danger-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    
    .profile-section {
      display: flex;
      gap: 24px;
      margin: 24px;
      padding: 24px;
      background-color: var(--surface-hover);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }
    
    .profile-image-container {
      flex-shrink: 0;
    }
    
    .profile-image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease;
    }
    
    .profile-image:hover {
      transform: scale(1.1);
    }
    
    .profile-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .profile-info h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      color: var(--text-primary);
      font-weight: 500;
    }
    
    .email {
      color: var(--text-secondary);
      margin: 0 0 16px 0;
      font-size: 16px;
    }
    
    .chips-container {
      margin-top: 16px;
    }
    
    .department-chip, .designation-chip {
      transition: transform 0.3s ease;
    }
    
    .department-chip:hover, .designation-chip:hover {
      transform: translateY(-2px);
    }
    
    mat-divider {
      margin: 24px;
    }
    
    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
      margin: 0 24px 24px 24px;
      min-width: 600px;
    }
    
    .detail-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      border-radius: var(--radius-md);
      background-color: var(--surface-hover);
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease;
    }
    
    .detail-item:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .detail-icon {
      color: var(--primary);
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    
    .detail-content {
      flex: 1;
    }
    
    .detail-content label {
      display: block;
      color: var(--text-secondary);
      font-size: 14px;
      margin-bottom: 4px;
    }
    
    .detail-content p {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: var(--text-primary);
    }
    
    @media (max-width: 600px) {
      .details-container {
        padding: 8px;
        overflow-x: auto;
      }
      
      .card {
        min-width: 100%;
      }
      
      .profile-section {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin: 16px;
        padding: 16px;
      }
      
      .header-actions {
        flex-direction: column;
        width: 100%;
      }
      
      .action-button {
        width: 100%;
        justify-content: center;
      }
      
      .details-grid {
        grid-template-columns: 1fr;
        margin: 0 16px 16px 16px;
        min-width: auto;
      }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
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
