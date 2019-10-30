import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Post } from '../interfaces/Post';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import {Token} from '../interfaces/Token';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  showErrorBanner: boolean = false;

  test2: string;
  test3: boolean;


  data = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
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
            this.test3 = this.authService.isLoggedIn();
          } else {
            this.snackBar.open('Login leider nicht erfolgreich', 'Ok', {
              duration: 2000,
            });
          }
        }
      )
  }

  /*
    login() {
      this.userService.login(this.data.username, this.data.password)
        .subscribe(
          (result: boolean) => {
            if (result) {
              this.snackBar.open('Login erfolgreich', 'Ok', {
                duration: 2000,
              });
              this.userService.setUserInSession(this.data.username);
            } else {
              this.snackBar.open('Login leider nicht erfolgreich', 'Ok', {
                duration: 2000,
              });          
            }
          }
        )
  
      //Client HTTP + .subscribe() explained:
      //https://stackoverflow.com/questions/46769042/subscribe-to-observable-is-returning-undefined/46782678
  
    }
  */


  /*
    getPost() {
      console.log('hallo from login()');
      this.userService.getPost()
        .subscribe(
          (data: Post) => {
            console.log('Hello from subscribe');
            this.test = {
              userId: data['userId'],
              id: data['id'],
              title: data['title'],
              body: data['body']
            };
            console.log(this.test);
          }
        );
  
    }
  */

  setUserRole(role: string) {
    if (role === 'admin') {
    }

  }
}
