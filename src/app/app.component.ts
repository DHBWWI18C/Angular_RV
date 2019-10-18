import { Component } from '@angular/core';
import { CurrentUser } from './interfaces/CurrentUser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Raumverwaltung';
  currentUser: CurrentUser;
}
