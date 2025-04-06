import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphqlService } from './graphql.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private graphqlService: GraphqlService) {}

  getAllEmployees(): Observable<any[]> {
    return this.graphqlService.getAllEmployees();
  }

  getEmployeeById(id: string): Observable<any> {
    return this.graphqlService.searchEmployeeById(id);
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.graphqlService.addEmployee(employeeData);
  }

  updateEmployee(id: string, employeeData: any): Observable<any> {
    return this.graphqlService.updateEmployee(id, employeeData);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.graphqlService.deleteEmployee(id);
  }

  searchEmployees(criteria: { department?: string; designation?: string }): Observable<any[]> {
    return this.graphqlService.searchEmployeeByDesignationOrDepartment(criteria);
  }
}
