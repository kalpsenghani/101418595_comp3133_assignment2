// src/app/app.server.module.ts

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

// Define routes here as in your app.routes.ts, including dynamic routes
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/add', component: EmployeeFormComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [
    AppModule, // Import your main App module
    ServerModule, // Import ServerModule to enable SSR
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }) // Define the routing here for SSR
  ],
  bootstrap: [AppComponent] // Bootstrap the AppComponent
})
export class AppServerModule {}
