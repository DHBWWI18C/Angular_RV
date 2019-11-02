import { Component, OnInit } from '@angular/core';
import { Booking } from '../interfaces/Booking';
import { BookingService } from '../services/booking.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: Booking[];

  constructor(
    private authService: AuthenticationService,
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
