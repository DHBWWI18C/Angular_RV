import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {

  editUser: boolean = false;

  user: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
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
