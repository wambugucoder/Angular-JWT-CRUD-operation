import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, from } from 'rxjs';
import { Employee } from '../admin/employee';

import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Employee: any = [];
  constructor(
  public userService: UserService
  ) { }
  ngOnInit() {
  this.loadEmployees()
  }
  // Get employees list
  loadEmployees() {
  return this.userService.getEmployeesList().subscribe((data: {}) => {
  this.Employee = data;
  })
  }
  // Delete employee
  deleteEmployee(id) {
  if (window.confirm('Are you sure, you want to delete?')){
  this.userService.deleteEmployee(id).subscribe(data => {
  this.loadEmployees()
  })
  }
  }  
  }
