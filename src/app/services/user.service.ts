import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as config from '../CONFIG'; //Konfig-Datei wird gelanden (CONFIG.ts)

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(config.apiUrl + '/auth', params);
  }

  logout(): Observable<any> {
    return this.http.post(config.apiUrl + '/logout', {});
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(config.apiUrl + '/user', {})
  }

  //++++++++++
  getPost(): Observable<any> {
    return this.http.get('http://jsonplaceholder.typicode.com/posts/1', {});
  }
}
