import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as config from '../CONFIG'; //Konfig-Datei wird gelanden (CONFIG.ts)


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router
  ) { }

  // **********************+***************
  // **** AUTHENTIFICATION and SESSION ****
  // **********************+***************

  proofUserAuth(): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isLoggedIn(): boolean {
    let token = sessionStorage.getItem(config.sessionAuth);
    if (token !== null) {
      return true;
    }
    return false;
  }

  getSessionToken(): string {
    return sessionStorage.getItem(config.sessionAuth);
  }

  setUserInSession(token: string) {
    sessionStorage.setItem(config.sessionAuth, token);
  }

  deleteUserFromSession() {
    sessionStorage.removeItem(config.sessionAuth);
  }

}
