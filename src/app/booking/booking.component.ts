import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../interfaces/Booking';
import { BookingService } from '../services/booking.service';
import { Room } from '../interfaces/Room';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @Input()
  booking: Booking;

  room: Room;


  constructor(
    private bookingService: BookingService,
    private roomService: RoomsService
  ) { }

  ngOnInit() {
    this.roomService.getRoom(this.booking.roomId);
  }

}
