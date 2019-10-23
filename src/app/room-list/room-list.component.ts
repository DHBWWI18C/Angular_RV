import { Component, OnInit } from '@angular/core';

import { ROOMS } from '../database/db-rooms';
import { SIZES } from '../database/db-roomSizes';
import { Size } from '../interfaces/Size';
import { RoomsService } from '../services/rooms.service';
import { Room } from '../interfaces/Room';
import { FormControl } from '@angular/forms';


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
  step = 0; //Filter-

  constructor(private roomService: RoomsService) { }

  ngOnInit() {
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
    this.roomService.getRooms(this.filters.roomSize, this.filters.beamer, this.filters.startDate, this.filters.endDate)
      .subscribe(
        (result: Room[]) => {
          this.rooms = result;
        }
      );
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
