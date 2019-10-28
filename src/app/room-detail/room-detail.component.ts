import { Component, OnInit } from '@angular/core';
import { Room } from '../interfaces/Room';
import { Booking } from '../interfaces/Booking';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { ROOMS } from '../database/db-rooms';


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

  endDate: Date;
  minDate = new Date();

  currentRoom: Room;
  bookingCreated: boolean = false;
  wifi: boolean = false;
  food: boolean = false;
  booking: Booking;
  constructor(
    private _formBuilder: FormBuilder,
    private bookingService: BookingService
    ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({   //Hinzufügen von Validators, die erfüllt werden müssen,
      startDateCtl: ['', Validators.required],        //bevor der User weiter kommt
      endDateCtl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({ 
      agbCheckBoxCrl: ['', Validators.requiredTrue],
    });
    this.currentRoom = this.getRoomById(1);
  
    /*
    var roo = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.roomService.getRoom(params.get('id')));
    */
  }

  bookRoom(){
    this.bookingService.create(this.currentRoom.id, '', '', this.food, this.wifi)
      .subscribe(
        (data: Booking) => { this.booking = data; }
      )
    this.bookingCreated = true;

  }

  getRoomById(id): Room{
    let room = ROOMS[id];
    return room;
  }

}
