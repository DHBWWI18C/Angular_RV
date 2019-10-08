import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../interfaces/Room';
import { ROOMS } from '../database/db-rooms';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms = this.getRoomList();
  constructor() { }

  ngOnInit() {
  }
  
  getRoomList(){
    //TODO Server-Anfrage auf alle Räume
    //ROOMS ist ein normales Array, definiert in 'db-rooms.ts'
    return ROOMS;
  }

}
