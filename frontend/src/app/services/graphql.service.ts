import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  // Login mutation
  login(email: string, password: string): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query Login($email: String, $password: String!) {
          login(email: $email, password: $password) {
            token
            user {
              id
              username
              email
              created_at
            }
          }
        }
      `,
      variables: {
        email,
        password
      }
    }).valueChanges.pipe(map((result: any) => result.data.login));
  }

  // Signup mutation
  signup(userData: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signup($username: String!, $email: String!, $password: String!) {
          signup(username: $username, email: $email, password: $password) {
            token
            user {
              id
              username
              email
              created_at
            }
          }
        }
      `,
      variables: {
        username: userData.username,
        email: userData.email,
        password: userData.password
      }
    }).pipe(map((result: any) => result.data.signup));
  }

  // Get all employees
  getAllEmployees(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query GetAllEmployees {
          getAllEmployees {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      `
    }).valueChanges.pipe(map((result: any) => result.data.getAllEmployees));
  }

  // Get employee by ID
  searchEmployeeById(id: string): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query SearchEmployeeById($id: ID!) {
          searchEmployeeById(id: $id) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      `,
      variables: {
        id
      }
    }).valueChanges.pipe(map((result: any) => result.data.searchEmployeeById));
  }

  // Create employee
  addEmployee(employeeData: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String!, $designation: String!, $salary: Float!, $date_of_joining: String!, $department: String!, $employee_photo: String) {
          addEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, designation: $designation, salary: $salary, date_of_joining: $date_of_joining, department: $department, employee_photo: $employee_photo) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      `,
      variables: employeeData
    }).pipe(map((result: any) => result.data.addEmployee));
  }

  // Update employee
  updateEmployee(id: string, employeeData: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployee($id: ID!, $first_name: String, $last_name: String, $email: String, $gender: String, $designation: String, $salary: Float, $date_of_joining: String, $department: String, $employee_photo: String) {
          updateEmployee(id: $id, first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, designation: $designation, salary: $salary, date_of_joining: $date_of_joining, department: $department, employee_photo: $employee_photo) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      `,
      variables: {
        id,
        ...employeeData
      }
    }).pipe(map((result: any) => result.data.updateEmployee));
  }

  // Delete employee
  deleteEmployee(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id)
        }
      `,
      variables: {
        id
      }
    }).pipe(map((result: any) => result.data.deleteEmployee));
  }

  // Search employees by department or designation
  searchEmployeeByDesignationOrDepartment(criteria: { designation?: string; department?: string }): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query SearchEmployeeByDesignationOrDepartment($designation: String, $department: String) {
          searchEmployeeByDesignationOrDepartment(designation: $designation, department: $department) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      `,
      variables: criteria
    }).valueChanges.pipe(map((result: any) => result.data.searchEmployeeByDesignationOrDepartment));
  }
}
