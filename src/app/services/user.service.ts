import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  postData = {
    test: 'my test data'
  };

  apiUrl = 'http://httpbin.org' //'http://localhost:8080';
  constructor(private http: HttpClient) { }

  login(params: HttpParams) {
    this.http.post(this.apiUrl + '/post', params)
  }

  login2(): Observable<any> {
    return this.http.post(this.apiUrl + '/post', this.postData);
  }


  getPosts(): Observable<any> {
    return this.http.get('http://jsonplaceholder.typicode.com/posts/1', {});
  }
}
