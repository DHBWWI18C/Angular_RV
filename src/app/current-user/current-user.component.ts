import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/User';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {

  editUser: boolean = false;
  userForm: FormGroup;
  user: User;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.userForm = this._formBuilder.group({
      userNameCtl: ['', Validators.required],
      firstNameCtl: ['', Validators.required],
      lastNameCtl: ['', Validators.required],
      emailCtl: ['', [Validators.required, Validators.email]],
      passwordCtl: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.userForm.disable();


    this.userService.getCurrentUser()
      .subscribe(
        (data: User) => {
          this.user = data;
          this.userForm.setValue({
            userNameCtl: this.user.userName,
            firstNameCtl: this.user.firstName,
            lastNameCtl: this.user.secondName,
            emailCtl: this.user.mail,
            passwordCtl: this.user.password
          })
        }
      )
  }

  saveUser() {
    this.editUser = false;
    this.userForm.disable();
    this.userService.updateUser({
      ...this.user,     
      //Current User wird mit folgenden Werten ersetzt:
      userName: this.userForm.value.userNameCtl,
      firstName: this.userForm.value.firstNameCtl,
      secondName: this.userForm.value.lastNameCtl,
      mail: this.userForm.value.email,
      password: this.userForm.value.password
    })
      .subscribe((data) => data = data);
  }

  edit() {
    if (this.editUser) {
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
    this.editUser = !this.editUser;
  }
}
