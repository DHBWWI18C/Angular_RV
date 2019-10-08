import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/Room';
import { HttpClient } from 'selenium-webdriver/http';
import { UserService } from '../services/user.service';

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
      const params = {};
      this.userService.login(this.data);
    //alert(result);
  }

}
