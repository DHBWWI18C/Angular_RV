import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {

  editUser: boolean = false;

  user: User;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    //Checken, ob User eingelogt ist, wenn nicht -> redirect
    this.authService.proofUserAuth();

    this.userService.getCurrentUser()
      .subscribe(
        (data: User) => {
          this.user = data;
        }
      )
  }

  saveUser() {
    this.editUser = false;
    this.userService.updateUser(this.user)
      .subscribe((data) => data = data);
  }
}
