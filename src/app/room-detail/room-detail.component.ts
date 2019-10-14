import { Component, OnInit } from '@angular/core';
import { Room } from '../interfaces/Room';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  //room$: Room;

  constructor(/*
      private room: Room,
      private route: ActivatedRoute,
      private roomService: RoomsService
      */) { }

  ngOnInit() {
    /*
    var roo = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.roomService.getRoom(params.get('id')));
    */
  }

}
