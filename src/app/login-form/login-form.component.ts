import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import {Token} from '../interfaces/Token';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
  }

  login() {
    this.userService.login(this.data.username, this.data.password)
      .subscribe(
        (result: Token) => {
          if (result != null) {
            this.snackBar.open('Login erfolgreich', 'Ok', {
              duration: 2000,
            });
            this.authService.setUserInSession(result.token);
            this.router.navigate(['/']);
          } else {
            this.snackBar.open('Login leider nicht erfolgreich', 'Ok', {
              duration: 2000,
            });
          }
        }
      )
  }
}
