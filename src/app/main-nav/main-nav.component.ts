import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  userLoggedIn: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
    ) {}

  ngOnInit() {
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (result: boolean) => {
          if (result == true) {
            this.snackBar.open('Logout erfolgreich', 'Ok', {
              duration: 2000,
            });
            this.authService.deleteUserFromSession();
            this.router.navigate(['/login']);
          } else {
            this.snackBar.open('Logout leider nicht erfolgreich', 'Ok', {
              duration: 2000,
            });          }
        }
      )
  }
}
