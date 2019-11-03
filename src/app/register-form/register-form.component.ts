import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import { Token } from '../interfaces/Token';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;


  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register() {
    this.userService.register(this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.email)
      .subscribe(
        (result: Token) => {
          if (result) {
            this.snackBar.open('Registrierung erfolgreich', 'Ok', {
              duration: 3000,
            });
            this.authService.setUserInSession(result.token);
            console.log(this.authService.isLoggedIn());
          } else {
            this.snackBar.open('Registrierung leider nicht erfolgreich', 'Ok', {
              duration: 3000,
            });
          }
        }
      )
  }
}
