import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeService } from '../../../services/employee.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="form-container fade-in">
      <mat-card class="card">
        <div class="header-section">
          <div class="header-content">
            <div class="header-title">
              <button mat-icon-button (click)="goBack()" class="back-button" matTooltip="Go back">
                <mat-icon>arrow_back</mat-icon>
              </button>
              <mat-card-title>
                <mat-icon class="header-icon">{{isEditMode ? 'edit' : 'person_add'}}</mat-icon>
                {{isEditMode ? 'Update' : 'Add'}} Employee
              </mat-card-title>
            </div>
          </div>
        </div>
        <mat-card-content>
          <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
            <div class="form-grid">
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>First Name</mat-label>
                  <input matInput formControlName="first_name" placeholder="Enter first name">
                  <mat-icon matPrefix class="field-icon">person</mat-icon>
                  <mat-error *ngIf="employeeForm.get('first_name')?.hasError('required')">
                    First name is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Last Name</mat-label>
                  <input matInput formControlName="last_name" placeholder="Enter last name">
                  <mat-icon matPrefix class="field-icon">person</mat-icon>
                  <mat-error *ngIf="employeeForm.get('last_name')?.hasError('required')">
                    Last name is required
                  </mat-error>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="form-field full-width">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" type="email" placeholder="Enter email">
                <mat-icon matPrefix class="field-icon">email</mat-icon>
                <mat-error *ngIf="employeeForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="employeeForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Department</mat-label>
                  <input matInput formControlName="department" placeholder="Enter department">
                  <mat-icon matPrefix class="field-icon">business</mat-icon>
                  <mat-error *ngIf="employeeForm.get('department')?.hasError('required')">
                    Department is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Designation</mat-label>
                  <input matInput formControlName="designation" placeholder="Enter designation">
                  <mat-icon matPrefix class="field-icon">work</mat-icon>
                  <mat-error *ngIf="employeeForm.get('designation')?.hasError('required')">
                    Designation is required
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Salary</mat-label>
                  <input matInput formControlName="salary" type="number" placeholder="Enter salary">
                  <mat-icon matPrefix class="field-icon">attach_money</mat-icon>
                  <mat-error *ngIf="employeeForm.get('salary')?.hasError('required')">
                    Salary is required
                  </mat-error>
                  <mat-error *ngIf="employeeForm.get('salary')?.hasError('min')">
                    Salary must be greater than 0
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Gender</mat-label>
                  <mat-select formControlName="gender">
                    <mat-option value="Male">Male</mat-option>
                    <mat-option value="Female">Female</mat-option>
                    <mat-option value="Other">Other</mat-option>
                  </mat-select>
                  <mat-icon matPrefix class="field-icon">wc</mat-icon>
                  <mat-error *ngIf="employeeForm.get('gender')?.hasError('required')">
                    Gender is required
                  </mat-error>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="form-field full-width">
                <mat-label>Date of Joining</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="date_of_joining">
                <mat-icon matPrefix class="field-icon">event</mat-icon>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="employeeForm.get('date_of_joining')?.hasError('required')">
                  Date of joining is required
                </mat-error>
              </mat-form-field>

              <div class="file-upload-section">
                <div class="file-upload-row">
                  <div class="file-upload-container">
                    <label class="file-upload-label">Profile Picture</label>
                    <div class="file-upload-controls">
                      <input type="file" (change)="onFileSelected($event)" accept="image/*" class="file-input" id="profile-picture">
                      <label for="profile-picture" class="file-upload-button">
                        <mat-icon>cloud_upload</mat-icon>
                        <span>Choose File</span>
                      </label>
                      <img *ngIf="previewUrl" [src]="previewUrl" alt="Preview" class="preview-image">
                    </div>
                  </div>
                  <div class="form-actions">
                    <button mat-button type="button" (click)="goBack()" class="button-secondary">
                      <mat-icon>arrow_back</mat-icon>
                      Cancel
                    </button>
                    <button mat-raised-button color="primary" type="submit" [disabled]="employeeForm.invalid" class="button-primary">
                      <mat-icon>{{isEditMode ? 'save' : 'add'}}</mat-icon>
                      {{isEditMode ? 'Update' : 'Add'}} Employee
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 16px;
      height: calc(100vh - 32px);
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
    
    .card {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: var(--surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
    }
    
    .header-section {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      padding: 16px;
      color: white;
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
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
    
    .form-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 24px;
      overflow-y: auto;
      max-height: calc(100vh - 200px);
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    
    .form-field {
      width: 100%;
      transition: transform 0.3s ease;
    }
    
    .form-field:hover {
      transform: translateY(-2px);
    }
    
    .field-icon {
      color: var(--primary);
      margin-right: 8px;
    }
    
    .full-width {
      grid-column: 1 / -1;
    }
    
    .file-upload-section {
      grid-column: 1 / -1;
      margin-top: 8px;
    }
    
    .file-upload-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }
    
    .file-upload-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .file-upload-label {
      color: var(--text-secondary);
      font-size: 14px;
    }
    
    .file-upload-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .file-input {
      display: none;
    }
    
    .file-upload-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background-color: var(--surface-hover);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .file-upload-button:hover {
      background-color: var(--surface-hover-dark);
      transform: translateY(-2px);
    }
    
    .preview-image {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease;
    }
    
    .preview-image:hover {
      transform: scale(1.2);
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
    }
    
    .button-primary, .button-secondary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 16px;
      height: 40px;
      border-radius: var(--radius-md);
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .button-primary {
      background-color: var(--primary);
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .button-primary:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    
    .button-secondary {
      color: var(--text-secondary);
    }
    
    .button-secondary:hover {
      background-color: var(--surface-hover);
      color: var(--text-primary);
      transform: translateY(-2px);
    }
    
    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .file-upload-row {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .form-actions {
        width: 100%;
        justify-content: space-between;
      }
      
      .button-primary, .button-secondary {
        width: 48%;
        justify-content: center;
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
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: string | null = null;
  previewUrl: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private themeService: ThemeService
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      date_of_joining: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.isEditMode = true;
      this.loadEmployee();
    }
  }

  loadEmployee() {
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (employee) => {
          const formattedEmployee = {
            ...employee,
            date_of_joining: new Date(employee.date_of_joining)
          };
          this.employeeForm.patchValue(formattedEmployee);
          if (employee.employee_photo) {
            this.previewUrl = employee.employee_photo;
          }
        },
        error: (error) => {
          this.snackBar.open('Error loading employee: ' + (error.message || 'Employee not found'), 'Close', { 
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.goBack();
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = { ...this.employeeForm.value };
      
      if (formData.date_of_joining) {
        formData.date_of_joining = new Date(formData.date_of_joining).toISOString();
      }
      
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          formData.employee_photo = e.target.result;
          this.submitEmployee(formData);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.submitEmployee(formData);
      }
    } else {
      Object.keys(this.employeeForm.controls).forEach(key => {
        const control = this.employeeForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  private submitEmployee(formData: any) {
    if (this.isEditMode && this.employeeId) {
      const updateData = {
        ...formData,
        id: this.employeeId
      };

      this.employeeService.updateEmployee(this.employeeId, updateData).subscribe({
        next: () => {
          this.snackBar.open('Employee updated successfully', 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.goBack();
        },
        error: (error) => {
          console.error('Update error:', error);
          if (error.message && error.message.includes('duplicate key error')) {
            this.snackBar.open('An employee with this email already exists. Please use a different email.', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          } else {
            this.snackBar.open('Error updating employee: ' + (error.message || 'Unknown error'), 'Close', { 
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        }
      });
    } else {
      const createData = {
        ...formData
      };

      this.employeeService.createEmployee(createData).subscribe({
        next: (response) => {
          this.snackBar.open('Employee added successfully', 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/employees'], { 
            queryParams: { refresh: Date.now() },
            replaceUrl: true
          });
        },
        error: (error) => {
          console.error('Create error:', error);
          if (error.message && error.message.includes('duplicate key error')) {
            this.snackBar.open('An employee with this email already exists. Please use a different email.', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          } else {
            this.snackBar.open('Error adding employee: ' + (error.message || 'Unknown error'), 'Close', { 
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/employees'], { 
      queryParams: { refresh: Date.now() },
      replaceUrl: true
    });
  }
}
