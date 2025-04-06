import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeService } from '../../../services/employee.service';
import { ThemeService } from '../../../services/theme.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <div class="list-container fade-in">
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Employee List</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="table-actions">
            <div class="search-filters">
              <mat-form-field appearance="outline" class="search-field">
                <mat-label>Search</mat-label>
                <input matInput (keyup)="applyFilter($event)" placeholder="Search employees...">
                <mat-icon matPrefix>search</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="filter-field">
                <mat-label>Department</mat-label>
                <mat-select [(value)]="selectedDepartment" (selectionChange)="applyFilter()">
                  <mat-option value="">All Departments</mat-option>
                  <mat-option *ngFor="let dept of departments" [value]="dept">
                    {{dept}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="filter-field">
                <mat-label>Designation</mat-label>
                <mat-select [(value)]="selectedDesignation" (selectionChange)="applyFilter()">
                  <mat-option value="">All Designations</mat-option>
                  <mat-option *ngFor="let desig of designations" [value]="desig">
                    {{desig}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <button mat-raised-button color="primary" (click)="addEmployee()" class="add-button">
              <mat-icon>add</mat-icon>
              Add Employee
            </button>
          </div>

          <div class="table-container">
            <table mat-table [dataSource]="dataSource" matSort>
              <ng-container matColumnDef="employee_photo">
                <th mat-header-cell *matHeaderCellDef>Photo</th>
                <td mat-cell *matCellDef="let employee">
                  <img [src]="employee.employee_photo || 'assets/default-avatar.png'" 
                       [alt]="employee.first_name"
                       class="employee-photo">
                </td>
              </ng-container>

              <ng-container matColumnDef="first_name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>First Name</th>
                <td mat-cell *matCellDef="let employee">{{employee.first_name}}</td>
              </ng-container>

              <ng-container matColumnDef="last_name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Last Name</th>
                <td mat-cell *matCellDef="let employee">{{employee.last_name}}</td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
                <td mat-cell *matCellDef="let employee">{{employee.email}}</td>
              </ng-container>

              <ng-container matColumnDef="department">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Department</th>
                <td mat-cell *matCellDef="let employee">
                  <mat-chip-set>
                    <mat-chip color="primary">{{employee.department}}</mat-chip>
                  </mat-chip-set>
                </td>
              </ng-container>

              <ng-container matColumnDef="designation">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Designation</th>
                <td mat-cell *matCellDef="let employee">
                  <mat-chip-set>
                    <mat-chip color="accent">{{employee.designation}}</mat-chip>
                  </mat-chip-set>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let employee">
                  <div class="action-buttons">
                    <button mat-icon-button (click)="viewEmployee(employee.id)" class="action-button view-button">
                      <mat-icon>visibility</mat-icon>
                    </button>
                    <button mat-icon-button (click)="editEmployee(employee.id)" class="action-button edit-button">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button (click)="deleteEmployee(employee.id)" class="action-button delete-button">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                  (click)="viewEmployee(row)"
                  class="table-row"></tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"
                          aria-label="Select page of employees">
            </mat-paginator>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .list-container {
      padding: var(--spacing-md);
      max-width: 1250px;
      margin: 0 auto;
      background-color: var(--surface);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }
    
    .card {
      margin-bottom: var(--spacing-lg);
      border: none;
      box-shadow: none;
    }
    
    .table-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
      flex-wrap: wrap;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      background-color: var(--gray-100);
      border-radius: var(--radius-md);
    }
    
    .search-filters {
      display: flex;
      gap: var(--spacing-md);
      flex: 1;
      flex-wrap: wrap;
      align-items: center;
    }
    
    .search-field {
      flex: 2;
      min-width: 200px;
    }
    
    .filter-field {
      flex: 1;
      min-width: 150px;
    }
    
    .add-button {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      height: 40px;
      background-color: var(--primary);
      color: white;
      border-radius: var(--radius-sm);
      transition: background-color var(--transition-normal);
      margin-left: auto;
      padding: 0 var(--spacing-md);
    }
    
    .add-button:hover {
      background-color: var(--primary-dark);
    }
    
    .table-container {
      border-radius: var(--radius-md);
      overflow: hidden;
      margin-top: var(--spacing-md);
      box-shadow: var(--shadow-sm);
    }
    
    .employee-photo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: var(--shadow-sm);
    }
    
    .table-row {
      cursor: pointer;
      transition: background-color var(--transition-fast);
    }
    
    .table-row:hover {
      background-color: var(--surface-hover);
    }
    
    mat-chip-set {
      display: inline-block;
    }
    
    .mat-column-actions {
      width: 80px;
      text-align: center;
    }
    
    .mat-column-employee_photo {
      width: 80px;
    }
    
    @media (max-width: 768px) {
      .table-actions {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-filters {
        flex-direction: column;
      }
      
      .search-field, .filter-field {
        width: 100%;
      }
      
      .add-button {
        width: 100%;
        justify-content: center;
      }
    }
    
    .action-buttons {
      display: flex;
      gap: var(--spacing-xs);
    }
    
    .action-button {
      transition: transform var(--transition-normal);
    }
    
    .action-button:hover {
      transform: translateY(-2px);
    }
    
    .view-button {
      color: var(--info);
    }
    
    .view-button:hover {
      background-color: rgba(var(--info-rgb), 0.1);
    }
    
    .edit-button {
      color: var(--warning);
    }
    
    .edit-button:hover {
      background-color: rgba(var(--warning-rgb), 0.1);
    }
    
    .delete-button {
      color: var(--danger);
    }
    
    .delete-button:hover {
      background-color: rgba(var(--danger-rgb), 0.1);
    }
  `]
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'employee_photo',
    'first_name',
    'last_name',
    'email',
    'department',
    'designation',
    'actions'
  ];
  dataSource: any[] = [];
  departments: string[] = [];
  designations: string[] = [];
  selectedDepartment = '';
  selectedDesignation = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  private routerSubscription: Subscription;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private themeService: ThemeService
  ) {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadEmployees();
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees: any[]) => {
        this.dataSource = employees;
        this.extractDepartmentsAndPositions();
      },
      error: (error: Error) => {
        console.error('Error loading employees:', error);
        this.snackBar.open('Failed to load employees: ' + (error.message || 'Unknown error'), 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  extractDepartmentsAndPositions() {
    this.departments = [...new Set(this.dataSource.map(emp => emp.department))];
    this.designations = [...new Set(this.dataSource.map(emp => emp.designation))];
  }

  applyFilter(event?: Event) {
    let filterValue = '';
    if (event) {
      const filterEvent = event as KeyboardEvent;
      filterValue = (filterEvent.target as HTMLInputElement).value.toLowerCase().trim();
    }
    
    let filteredData = [...this.dataSource];
    
    // Apply text filter
    if (filterValue) {
      filteredData = filteredData.filter(emp => 
        emp.first_name.toLowerCase().includes(filterValue) ||
        emp.last_name.toLowerCase().includes(filterValue) ||
        emp.email.toLowerCase().includes(filterValue)
      );
    }
    
    // Apply department filter
    if (this.selectedDepartment) {
      filteredData = filteredData.filter(emp => 
        emp.department === this.selectedDepartment
      );
    }
    
    // Apply designation filter
    if (this.selectedDesignation) {
      filteredData = filteredData.filter(emp => 
        emp.designation === this.selectedDesignation
      );
    }
    
    this.dataSource = filteredData;
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

  viewEmployee(employeeId: string) {
    this.router.navigate(['/employees', employeeId]);
  }

  editEmployee(employeeId: string) {
    this.router.navigate(['/employees/edit', employeeId]);
  }

  deleteEmployee(employeeId: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(emp => emp.id !== employeeId);
          
          this.snackBar.open('Employee deleted successfully', 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Error deleting employee: ' + (error.message || 'Unknown error'), 'Close', { 
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
