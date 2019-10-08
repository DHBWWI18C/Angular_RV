import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(params: HttpParams) {
    this.http.get('http://localhost:8080/auth', {params})
     .subscribe()
    alert();
  }
}
