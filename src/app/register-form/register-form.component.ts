import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  data = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  constructor() { }

  ngOnInit() {
  }

  register(){
    alert('The register-function was called.');
  }
}
