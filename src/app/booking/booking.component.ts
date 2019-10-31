import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../interfaces/Booking';
import { Room } from '../interfaces/Room';
import { RoomsService } from '../services/rooms.service';
import { ROOMS } from '../database/db-rooms';
import { NgListItem } from '../interfaces/NgListItem';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @Input()
  booking: Booking;

  room: Room;
  currentRoom: Room;
  listItems: NgListItem[];
  panelOpen: boolean = false;

  constructor(
    private roomService: RoomsService
  ) { }

  ngOnInit() { 
    this.currentRoom = ROOMS[1];
    this.booking = {
      id: 434345,
      roomId: this.currentRoom.id,
      wifi: true,
      food: true,
      userId: 3,
      startDate: '15.11.2020',
      endDate: '15.11.2020',
      prices: {
        priceSum: 230,
        wifiPrice: 30,
        foodPrice: 100,
        roomPrice: 100
      }
    }
    /*
    this.roomService.getRoom(this.booking.roomId)
      .subscribe(
        (data: Room) => {
          this.room = data;
        }
      )
      */
     this.listItems = [
      {
        description: 'Buchungsnummer',
        matIcon: 'book',
        value: this.booking.id.toString()
      }
    ]
  }

}
