import { Component, OnInit } from '@angular/core';
import { Booking } from '../interfaces/Booking';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: Booking[];

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    
    this.bookingService.getList()
      .subscribe(
        (data: Booking[]) => {
        this.bookings = data;
        }
      );
  }

}
