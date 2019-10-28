import { Component, OnInit } from '@angular/core';
import { Room } from '../interfaces/Room';
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
  
  constructor(
    private _formBuilder: FormBuilder,
    private bookingService: BookingService
    ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      startDateCtl: ['', Validators.required],
      endDateCtl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({ 
      agbCheckBoxCrl: ['', Validators.requiredTrue], //
    });
    this.currentRoom = this.getRoomById(1);
  
    /*
    var roo = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.roomService.getRoom(params.get('id')));
    */
  }

  bookRoom(){
    //this.bookingService.create()
    this.bookingCreated = true;

  }

  getRoomById(id): Room{
    let room = ROOMS[id];
    return room;
  }

}
