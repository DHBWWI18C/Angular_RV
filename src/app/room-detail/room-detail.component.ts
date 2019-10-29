import { Component, OnInit } from '@angular/core';
import { Room } from '../interfaces/Room';
import { Booking } from '../interfaces/Booking';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { ROOMS } from '../database/db-rooms';
import { Prices } from '../interfaces/Prices';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  //room$: Room;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  endDate = new Date();
  minDate = new Date();

  currentRoom: Room;
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
    private route: ActivatedRoute,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({   //Hinzufügen von Validators, die erfüllt werden müssen,
      startDateCtl: ['', Validators.required],        //bevor der User weiter kommt
      endDateCtl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      agbCheckBoxCrl: ['', Validators.requiredTrue],
    });

    this.currentRoom = this.getRoomById(this.route.snapshot.paramMap.get("id"));

    //Aufruf für einen Tag, bevor der User Datum gewählt hat
    /*
    this.bookingService.getPrices(this.currentRoom.id, '01.01.2000', '01.01.2000', false, false)
      .subscribe(
        (data: Prices) => {
          this.booking.prices = data;
        }
      );
    */
    this.booking.prices = this.getPrices_init();

  }

  //ChangeEvent
  updateStartDate(event) {
    this.booking.startDate = this.datepipe.transform(event.value, 'dd.MM.yyyy');
    if (this.booking.endDate != '') {  //TODO
      this.updatePrices();
    }
    this.updatePrices();
  }
  updateEndDate(event) {
    this.booking.endDate = this.datepipe.transform(event.value, 'dd.MM.yyyy');
    if (this.booking.startDate != '') {  //TODO
      this.updatePrices();
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
    this.bookingService.create(this.currentRoom.id, this.booking.startDate, this.booking.endDate, this.booking.food, this.booking.wifi)
      .subscribe(
        (data: Booking) => { this.booking = data; }
      )
    this.bookingCreated = true;

  }

  getPrices_init(): Prices {
    let _prices: Prices = {
      priceSum: 200,
      wifiPrice: 0,
      foodPrice: 0,
      roomPrice: 200
    };
    return _prices;
  }

  getRoomById(id): Room {
    let room = ROOMS[id - 1];
    return room;
  }

}
