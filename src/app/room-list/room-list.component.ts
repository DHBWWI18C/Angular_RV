import { Component, OnInit } from '@angular/core';

import { ROOMS } from '../database/db-rooms';
import { SIZES } from '../database/db-roomSizes';
import { Size } from '../interfaces/Size';
import { RoomsService } from '../services/rooms.service';
import { Room } from '../interfaces/Room';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  startdate = new FormControl(new Date());

  roomSizes: Size[];
  rooms: Room[];

  filters = {
    roomSize: '',
    beamer: '',
    startDate: '',
    endDate: ''
  };

  minDateStart = new Date();
  minDateEnd = new Date();
  dateFormGroup: FormGroup;

  activePanel = 0; //Filter-Panels 

  constructor(
    private roomService: RoomsService,
    private datepipe: DatePipe,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.dateFormGroup = this._formBuilder.group({   
      startDateCtl: [''],
      endDateCtl: ['']
    });
    this.roomSizes = SIZES;
    this.getRoomsList();
  }

  getRoomsList() {
    this.roomService.getRoomsList()
      .subscribe(
        (result: Room[]) => {
          this.rooms = result;
          console.log(this.rooms);
        },
        error => {
          console.log(error);
        }
      );
  }

  filter() {
    this.activePanel = 0;  // schließt Panel -> 'step' definiert offenes '<mat-expansion-panel>'-Element

    this.roomService.getRoomsFiltered(this.filters.roomSize, this.filters.beamer, this.filters.startDate, this.filters.endDate)
      .subscribe(
        (result: Room[]) => {
          this.rooms = result;
        }
      );
  }


  setActivePanel(index: number) {
    this.activePanel = index;
  }

  nextPanel() {
    this.activePanel++;
  }

  prevPanel() {
    this.activePanel--;
  }

  //ChangeEvent
  updateStartDate(event) {
    this.filters.startDate = this.datepipe.transform(event.value, 'dd.MM.yyyy');
    this.minDateEnd = new Date(this.datepipe.transform(event.value, 'yyyy-MM-dd'));
  }
  updateEndDate(event) {
    this.filters.endDate = this.datepipe.transform(event.value, 'dd.MM.yyyy');
  }

  resetForm() {
    this.dateFormGroup.reset();
    this.filters.beamer = "";
    this.filters.roomSize = "";
  }
}
