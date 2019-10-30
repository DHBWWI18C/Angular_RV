import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../interfaces/Room';
import { ROOMS } from '../database/db-rooms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {

  @Input()
  room: Room;
  @Input()
  showBookButton: boolean;
  @Input()
  showBody: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  bookRoom() {
    this.router.navigate(['/room/' + this.room.id]);
  }
}
