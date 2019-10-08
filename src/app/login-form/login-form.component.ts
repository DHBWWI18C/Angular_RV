import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/Room';
import { HttpClient } from 'selenium-webdriver/http';
import { UserService } from '../services/user.service';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  data = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    const params = new HttpParams()
      .set('username', this.data.username)
      .set('password', this.data.password);
      
    this.userService.login(params);
  }

}
