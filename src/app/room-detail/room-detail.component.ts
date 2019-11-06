import { Component, OnInit } from '@angular/core';
import { Room } from '../interfaces/Room';
import { Booking } from '../interfaces/Booking';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { Prices } from '../interfaces/Prices';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  minDateEnd = new Date();
  minDateStart = new Date();

  currentRoom: Room;
  roomAvailable: boolean = false;
  bookingCreated: boolean = false;

  booking: Booking = {
    id: 0,
    userId: 0,
    roomId: 0,
    wifi: false,
    food: false,
    startDate: '',
    endDate: '',
    prices: {
      priceSum: 0,
      roomPrice: 0,
      wifiPrice: 0,
      foodPrice: 0
    }
  };

  constructor(
    private _formBuilder: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {

    this.bookingCreated = false;
    //Hinzufügen von Validators, die erfüllt werden müssen, bevor der User weiter gehen kann
    this.firstFormGroup = this._formBuilder.group({   
      startDateCtl: ['', Validators.required],        
      endDateCtl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      agbCheckBoxCrl: ['', Validators.requiredTrue],
    });

    //this.currentRoom = this.getRoomById(this.route.snapshot.paramMap.get("id"));
    this.roomService.getRoom(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (data: Room) => {
          this.currentRoom = data;
        }
      )

    //Aufruf für einen Tag, bevor der User ein Datum gewählt hat
    this.bookingService.getPrices(this.currentRoom.id, '01.01.2000', '01.01.2000', false, false)
      .subscribe(
        (data: Prices) => {
          this.booking.prices = data;
        }
      );
  }

  checkRoomAvailable() {
    this.roomService.isRoomAvailable(this.currentRoom.id, this.booking.startDate, this.booking.endDate)
     .subscribe(
      (data: boolean) => {
        this.roomAvailable = data;
      }
    )
  }

  //ChangeEvent
  updateStartDate(event) {
    this.booking.startDate = this.datepipe.transform(event.value, 'dd.MM.yyyy');
    if (this.booking.endDate != '') {
      this.updatePrices();
      this.checkRoomAvailable();
    }
    this.minDateEnd = new Date(this.datepipe.transform(event.value, 'yyyy-MM-dd'));
  }
  updateEndDate(event) {
    this.booking.endDate = this.datepipe.transform(event.value, 'dd.MM.yyyy');
    if (this.booking.startDate != '') {
      this.updatePrices();
      this.checkRoomAvailable();
    }
  }

  updatePrices() {
    this.bookingService.getPrices(this.currentRoom.id, this.booking.startDate, this.booking.endDate, this.booking.food, this.booking.wifi)
      .subscribe(
        (data: Prices) => {
          this.booking.prices = data;
        }
      );
  }
  updateWifi() {
    this.booking.wifi = !this.booking.wifi;
    this.updatePrices();
  }
  updateFood() {
    this.booking.food = !this.booking.food;
    this.updatePrices();
  }

  bookRoom() {
    this.bookingService.create(this.currentRoom.id, this.booking.startDate, this.booking.endDate, this.booking.food, this.booking.wifi, this.booking.prices.priceSum)
      .subscribe(
        (data: Booking) => 
        { 
          if(data){
            this.booking = data;
            this.snackBar.open('Buchung erfolgreich', 'Ok', {
              duration: 2000,
            });
          } else {
            this.snackBar.open('Buchung leider nicht erfolgreich', 'Ok', {
              duration: 2000,
            });
          }
        }
      )
    this.bookingCreated = true;
  }
}
