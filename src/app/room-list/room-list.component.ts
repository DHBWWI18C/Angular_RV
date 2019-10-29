import { Component, OnInit } from '@angular/core';

import { ROOMS } from '../database/db-rooms';
import { SIZES } from '../database/db-roomSizes';
import { Size } from '../interfaces/Size';
import { RoomsService } from '../services/rooms.service';
import { Room } from '../interfaces/Room';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  startdate = new FormControl(new Date());

  roomSizes: Size[];
  rooms: Room[] = ROOMS;
  
  filters = {
    roomSize: '',
    beamer: '',
    startDate: '',
    endDate: ''
  };

  minDate = new Date();
  activePanel = 0; //Filter-Panels 

  constructor(
    private roomService: RoomsService,
    private userService: UserService
    ) { }

  ngOnInit() {
    //this.userService.proofUserAuth();

    this.roomSizes = SIZES;
  }

  getRoomsList() {
    this.roomService.getRoomsList()
      .subscribe(
        (result: Room[]) => {
          this.rooms = result;
        }
      );
  }

  filter() {
    this.activePanel = 0;  //'step' definiert offenes '<mat-expansion-panel>'-Element

    this.roomService.getRooms(this.filters.roomSize, this.filters.beamer, this.filters.startDate, this.filters.endDate)
      .subscribe(
        (result: Room[]) => {
          this.rooms = result;
        }
      );
  }


  setActivePanel(index: number) {
    this.activePanel = index;
  }

  nextPanel() {
    this.activePanel++;
  }

  prevPanel() {
    this.activePanel--;
  }
}
