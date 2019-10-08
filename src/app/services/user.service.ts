import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/Room';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  login(params: HttpParams) {
    alert(this.http.get('http://localhost:8080/auth', {params}));
  }
}
