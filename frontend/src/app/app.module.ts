import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Apollo
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employees/employee-form/employee-form.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LeaveManagementComponent } from './components/leave/leave-management.component';
import { PerformanceReviewComponent } from './components/performance/performance-review.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/auth/login/login.component';

// Services
import { ThemeService } from './core/services/theme.service';
import { NotificationService } from './core/services/notification.service';
import { AuthService } from './core/services/auth.service';

// Guards
import { AuthGuard } from './core/guards/auth.guard';

// Pipes
import { SafeHtmlPipe } from './core/pipes/safe-html.pipe';

// Directives
import { HasPermissionDirective } from './core/directives/has-permission.directive';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    HasPermissionDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
      { path: 'employees/new', component: EmployeeFormComponent, canActivate: [AuthGuard] },
      { path: 'employees/:id', component: EmployeeFormComponent, canActivate: [AuthGuard] },
      { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
      { path: 'leave', component: LeaveManagementComponent, canActivate: [AuthGuard] },
      { path: 'performance', component: PerformanceReviewComponent, canActivate: [AuthGuard] },
      { path: 'payroll', component: PayrollComponent, canActivate: [AuthGuard] },
      { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
    ]),
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [
    ThemeService,
    NotificationService,
    AuthService,
    AuthGuard,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql'
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 