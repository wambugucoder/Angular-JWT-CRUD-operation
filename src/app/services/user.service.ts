import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Employee } from 'employee';
import { ApiResponse } from '../model/api.response';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userUrl = 'http://localhost:8080/api/test/user';
  public pmUrl = 'http://localhost:8080/api/test/pm';
  public adminUrl = 'http://localhost:8080/api/test/admin';
  public baseUrl = 'http://localhost:8080/api/employees';
  constructor(public http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    }  

  getUserBoard(): Observable<any> {
    return this.http.get(`${this.userUrl}`);
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${this.adminUrl}`);
  }
  getEmployee(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }

  updateEmployee(id, employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl+"/"  + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    )
}
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

 handleError(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
  // Get client-side error
  errorMessage = error.error.message;
  } else {
  // Get server-side error
  errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
  }
  }
