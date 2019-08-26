import { Component, OnInit , Inject, Input} from '@angular/core';
import { Employee } from '../user/employee';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {first} from 'rxjs/operators';
import { ok } from 'assert';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  employeeData: any = {};
  constructor(
  public userService: UserService,
  public actRoute: ActivatedRoute,
  public router: Router
  ) { 
  }
  ngOnInit() { 
  this.userService.getEmployee(this.id).subscribe((data: {}) => {
  this.employeeData = data;
  })
  }
  // Update employee data
  updateEmployee() {
  if(window.confirm('Are you sure, you want to update?')){
  this.userService.updateEmployee(this.id, this.employeeData).subscribe(data => {
  this.router.navigate(['/admin'])
})
}
  }}
