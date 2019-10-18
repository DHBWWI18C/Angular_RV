import { Component } from '@angular/core';
import { CurrentUser } from './interfaces/CurrentUser';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Raumverwaltung';
  currentUser: CurrentUser;

  constructor(private userService: UserService) { }

  logout() {
    this.userService.logout()
      .subscribe(
        (result: string) => {
          if (result === 'true') {
            alert('Logout successful.')
          } else {
            alert('Logout failed.')
          }
        }
      )
  }
}
