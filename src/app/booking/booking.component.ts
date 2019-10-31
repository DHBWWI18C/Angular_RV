import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../interfaces/Booking';
import { Room } from '../interfaces/Room';
import { RoomsService } from '../services/rooms.service';
import { NgListItem } from '../interfaces/NgListItem';
import { Prices } from '../interfaces/Prices';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @Input()
  booking: Booking;

  currentRoom: Room;
  listItems: NgListItem[];
  panelOpen: boolean = false;
  prices: Prices;

  constructor(
    private bookingService: BookingService,
    private roomService: RoomsService
  ) { }

  ngOnInit() { 
    /*
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
    }*/
  
    this.roomService.getRoom(this.booking.roomId.toString())
      .subscribe(
        (data: Room) => {
          this.currentRoom = data;
        }
      );
    
     this.listItems = [
      {
        description: 'Buchungsnummer',
        matIcon: 'book',
        value: this.booking.id.toString()
      }
    ]
  }


  getPrices() {
    this.bookingService.getPrices(this.currentRoom.id, this.booking.startDate, this.booking.endDate, this.booking.food, this.booking.wifi)
      .subscribe(
        (data: Prices) => {
          this.prices = data;
        }
      );
  }

}
