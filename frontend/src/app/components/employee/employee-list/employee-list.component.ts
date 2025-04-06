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
import { filter, Subscription, BehaviorSubject, interval } from 'rxjs';

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
        <mat-card-header class="header-section">
          <div class="header-content">
            <mat-card-title class="header-title">
              <mat-icon class="header-icon">people</mat-icon>
              Employee List
            </mat-card-title>
            <div class="header-actions">
              <button mat-raised-button color="primary" (click)="addEmployee()" class="add-button">
                <mat-icon>add</mat-icon>
                Add Employee
              </button>
            </div>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div class="table-actions">
            <div class="search-filters">
              <mat-form-field appearance="outline" class="search-field">
                <mat-label>Search</mat-label>
                <input matInput (keyup)="applyFilter($event)" placeholder="Search employees...">
                <mat-icon matPrefix class="search-icon">search</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="filter-field">
                <mat-label>Department</mat-label>
                <mat-select [(value)]="selectedDepartment" (selectionChange)="applyFilter()">
                  <mat-option value="">All Departments</mat-option>
                  <mat-option *ngFor="let dept of departments" [value]="dept">
                    {{dept}}
                  </mat-option>
                </mat-select>
                <mat-icon matPrefix class="filter-icon">business</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="filter-field">
                <mat-label>Designation</mat-label>
                <mat-select [(value)]="selectedDesignation" (selectionChange)="applyFilter()">
                  <mat-option value="">All Designations</mat-option>
                  <mat-option *ngFor="let desig of designations" [value]="desig">
                    {{desig}}
                  </mat-option>
                </mat-select>
                <mat-icon matPrefix class="filter-icon">work</mat-icon>
              </mat-form-field>
            </div>
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
                    <mat-chip color="primary" class="department-chip">{{employee.department}}</mat-chip>
                  </mat-chip-set>
                </td>
              </ng-container>

              <ng-container matColumnDef="designation">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Designation</th>
                <td mat-cell *matCellDef="let employee">
                  <mat-chip-set>
                    <mat-chip color="accent" class="designation-chip">{{employee.designation}}</mat-chip>
                  </mat-chip-set>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let employee">
                  <div class="action-buttons">
                    <button mat-icon-button (click)="viewEmployee(employee.id)" class="action-button view-button" matTooltip="View Details">
                      <mat-icon>visibility</mat-icon>
                    </button>
                    <button mat-icon-button (click)="editEmployee(employee.id)" class="action-button edit-button" matTooltip="Edit Employee">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button (click)="deleteEmployee(employee.id)" class="action-button delete-button" matTooltip="Delete Employee">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                  (click)="viewEmployee(row.id)"
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
      padding: 16px;
      height: calc(100vh - 32px);
      max-width: 1200px;
      margin: 0 auto;
      background-color: var(--surface);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      display: flex;
      flex-direction: column;
    }
    
    .card {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-bottom: 0;
      border: none;
      box-shadow: none;
      overflow: hidden;
    }
    
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
      padding: var(--spacing-md);
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
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
      gap: var(--spacing-md);
      color: white;
    }
    
    .header-icon {
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
    
    .table-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0;
      flex-wrap: wrap;
      gap: 16px;
      padding: 16px;
      background-color: var(--gray-100);
      border-radius: var(--radius-md);
    }
    
    .search-filters {
      display: flex;
      gap: 16px;
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
    
    .search-icon {
      color: var(--primary);
    }
    
    .filter-icon {
      color: var(--accent);
    }
    
    .add-button {
      background: var(--accent);
      color: white;
      font-weight: 500;
      padding: 0 var(--spacing-lg);
      height: 40px;
      border-radius: var(--radius-md);
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .add-button:hover {
      background: var(--accent-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }
    
    .add-button mat-icon {
      margin-right: var(--spacing-sm);
    }
    
    .table-container {
      flex: 1;
      border-radius: var(--radius-md);
      overflow: auto;
      margin-top: 16px;
      box-shadow: var(--shadow-sm);
    }
    
    .employee-photo {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease;
    }
    
    .employee-photo:hover {
      transform: scale(1.2);
    }
    
    .table-row {
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .table-row:hover {
      background-color: var(--surface-hover);
    }
    
    mat-chip-set {
      display: inline-block;
    }
    
    .department-chip {
      background-color: var(--primary);
      color: white;
      transition: transform 0.3s ease;
    }
    
    .department-chip:hover {
      transform: translateY(-2px);
    }
    
    .designation-chip {
      background-color: var(--accent);
      color: white;
      transition: transform 0.3s ease;
    }
    
    .designation-chip:hover {
      transform: translateY(-2px);
    }
    
    .mat-column-actions {
      width: 120px;
      text-align: center;
    }
    
    .mat-column-employee_photo {
      width: 60px;
    }
    
    .action-buttons {
      display: flex;
      gap: 8px;
      justify-content: center;
    }
    
    .action-button {
      transition: all 0.3s ease;
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
  originalData: any[] = [];
  departments: string[] = [];
  designations: string[] = [];
  selectedDepartment = '';
  selectedDesignation = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  private routerSubscription: Subscription;
  private refreshSubscription: Subscription;
  private refreshTrigger = new BehaviorSubject<boolean>(true);

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private themeService: ThemeService
  ) {
    // Subscribe to router events to refresh data when navigating to this component
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.refreshTrigger.next(true);
    });

    // Set up a refresh subscription that will reload data when triggered
    this.refreshSubscription = this.refreshTrigger.subscribe(() => {
      this.loadEmployees();
    });
  }

  ngOnInit() {
    // Initial load
    this.loadEmployees();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees: any[]) => {
        this.originalData = [...employees];
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
    
    let filteredData = [...this.originalData];
    
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

  // Method to manually refresh the employee list
  refreshEmployeeList() {
    this.loadEmployees();
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
