import { Injectable } from '@angular/core';
import * as config from '../CONFIG'; //Konfig-Datei wird gelanden (CONFIG.ts)


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // **********************+***************
  // **** AUTHENTIFICATION and SESSION ****
  // **********************+***************

  isLoggedIn(): boolean {
    let token = sessionStorage.getItem(config.sessionAuth);
    if (token) {
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
