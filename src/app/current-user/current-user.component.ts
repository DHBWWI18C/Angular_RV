import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {

  editUser: boolean = false;
  constructor() { }

  ngOnInit() {
  }


  saveUser(){
    this.editUser = false;
  }
}
