import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/Room';
import { ROOMS } from '../database/db-rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) {

  }/*
  private rooms = ROOMS;

  getRoom(id: string) : Room {
    var _id = parseInt(id, 10);
    if(isNaN(_id)){
      return null;
    }
    const result = this.rooms.filter(room => room.id === _id)[0];
    return result;
  }
  */
  //getRoomsList() : Observable<Room[]>{
  //}
}
