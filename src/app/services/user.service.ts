import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(this.apiUrl + '/auth', params);
  }

  logout(){
    return this.http.post(this.apiUrl + '/logout', {});
  }


  getPost(): Observable<any> {
    return this.http.get('http://jsonplaceholder.typicode.com/posts/1', {});
  }
}
