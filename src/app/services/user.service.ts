import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as config from '../CONFIG'; //Konfig-Datei wird gelanden (CONFIG.ts)
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(config.apiUrl + '/auth', params);
  }

  register(username: string, password: string, firstName: string, secondName: string, email: string): Observable<any> {
    const params = new HttpParams()
      .set('userName', username)
      .set('password', password)
      .set('firstName', firstName)
      .set('secondName', secondName)
      .set('mail', email);

    return this.http.post(config.apiUrl + '/user', params);
  }

  logout(): Observable<any> {
    this.authService.deleteUserFromSession();
    return this.http.post(config.apiUrl + '/logout', {});
  }

  getCurrentUser(): Observable<any> {
    let params = new HttpParams()
      .set('token', this.authService.getSessionToken());
    return this.http.get(config.apiUrl + '/user', { params })
  }

  updateUser(user: User): Observable<any> {
    let params = new HttpParams()
      .set('userId', user.id.toString())
      .set('firstName', user.firstName)
      .set('secondName', user.secondName)
      .set('mail', user.mail)
      .set('password', user.password)
      .set('userName', user.userName)
      .set('admin', '0')
      .set('token', this.authService.getSessionToken());

    return this.http.put(config.apiUrl + '/user', params)
  }
}
