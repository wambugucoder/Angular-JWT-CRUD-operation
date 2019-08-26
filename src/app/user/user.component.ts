import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;
  employees: Observable<Employee[]>;

  constructor(private userService: UserService) { }
  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employees = this.userService.getUserBoard();
  }


  }

