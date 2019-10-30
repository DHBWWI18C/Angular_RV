import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import {Token} from '../interfaces/Token';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  data = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  register(){
      this.userService.register(this.data.username, this.data.password, this.data.firstName, this.data.lastName, this.data.email)
        .subscribe(
          (result: Token) => {
            if (result != null) {
              this.snackBar.open('Registrierung erfolgreich', 'Ok', {
                duration: 2000,
              });
              this.authService.setUserInSession(result.token);
              console.log(this.authService.isLoggedIn());
            } else {
              this.snackBar.open('Registrierung leider nicht erfolgreich', 'Ok', {
                duration: 2000,
              });
            }
          }
        )
    }
}
