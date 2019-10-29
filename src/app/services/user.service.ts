import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as config from '../CONFIG'; //Konfig-Datei wird gelanden (CONFIG.ts)
import { Router } from '@angular/router';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  login(username: string, password: string): Observable<any> {

    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(config.apiUrl + '/auth', params);
  }

  logout(): Observable<any> {
    this.deleteUserFromSession();
    return this.http.post(config.apiUrl + '/logout', {});
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(config.apiUrl + '/user', {})
  }

  updateUser(user: User): Observable<any> {
    let params = new HttpParams()
      .set('userId', user.id.toString())
      .set('firstName', user.firstName)
      .set('secondName', user.secondName)
      .set('mail', user.mail)
      .set('password', user.password)
      .set('username', user.userName)
      .set('admin', '0');

    return this.http.put(config.apiUrl + '/user', params)
  }

  proofUserAuth(): boolean{
    let userName = sessionStorage.getItem('userName');
    if(userName !== null) {
      return true;
    }
    this.router.navigate(['/login']);
  }

  setUserInSession(userName: string){
    sessionStorage.setItem('userName', userName);
  }

  deleteUserFromSession() {
    sessionStorage.removeItem('userName');
    }

}
