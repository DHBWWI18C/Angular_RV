import { Component, OnInit } from '@angular/core';

import { ROOMS } from '../database/db-rooms';
import { SIZES } from '../database/db-roomSizes';
import { Size } from '../interfaces/Size';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  roomSizes: Size[];
  rooms = this.getRoomList();
  filters = {
    roomSize: '',
    beamer: '',
    startDate: '',
    endDate: ''
  };

  minDate = new Date();
  
  constructor() { }

  ngOnInit() {
    this.roomSizes = SIZES;
  }
  
  getRoomList(){
    //TODO Server-Anfrage auf alle Räume
    //ROOMS ist ein normales Array, definiert in 'db-rooms.ts'
    return ROOMS;
  }

  filter(){
    /*
      beamer: 1/ 0
      roomsize: 1/ 2/ 3
      startDate: dd.mm.yyyy
      endDate: dd.mm.yyyy
    */
  }
}
