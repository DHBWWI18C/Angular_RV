import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Post } from '../interfaces/Post';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  showErrorBanner: boolean = false;

  test: Post;

  data = {
    username: '',
    password: ''
  };
  
  constructor(private userService: UserService) { }


  ngOnInit() {
  }

  login() {
    this.userService.login(this.data.username, this.data.password)
      .subscribe(
        (result: string) => {
          if (result === 'true' ) {
            alert('Loggin successful. -> redirect');
          } else {
            alert('Loggin failed. -> errorMessage');
          }
        }
      )

    //Client HTTP + .subscribe() explained:
    //https://stackoverflow.com/questions/46769042/subscribe-to-observable-is-returning-undefined/46782678

  }


  getPost() {
    console.log('hallo from login()');
    this.userService.getPost()
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


  setUserRole(role: string) {
    if (role === 'admin') {
    }

  }
}
