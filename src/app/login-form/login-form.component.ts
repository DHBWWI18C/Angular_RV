import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/Room';
import { HttpClient } from 'selenium-webdriver/http';
import { UserService } from '../services/user.service';
import {HttpParams} from "@angular/common/http";
import { Post } from '../interfaces/Post';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  test: Post;

  data = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService) { }


  ngOnInit() {
  }

  login() {
    /*
    const params = new HttpParams()
      .set('username', this.data.username)
      .set('password', this.data.password);

      Client HTTP + .subscribe() explained:
      https://stackoverflow.com/questions/46769042/subscribe-to-observable-is-returning-undefined/46782678
    */
   console.log('hallo from login()');
    this.userService.getPosts()
      .subscribe(
        (data: Post) => {
          console.log('Hello from subscribe');
          this.test = {
            userId: data['userId'],
            id: data['id'],
            title: data['title'],
            body: data['body']
          };
          console.log(this.test);
        }
      );
      
  }


  setUserRole(role: string){
    if(role === 'admin') {
    }

  }
}
