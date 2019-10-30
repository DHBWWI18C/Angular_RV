import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Room } from '../interfaces/Room';
import { ROOMS } from '../database/db-rooms';
import * as config from '../CONFIG'; //Konfig-Datei wird gelanden (CONFIG.ts)
import { SIZES } from '../database/db-roomSizes';
import { Size } from '../interfaces/Size';



@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) {

  }
  
  getRoom(id: string): Observable<any> {
    let params = new HttpParams()
      .set("id", id);

    return this.http.get(config.apiUrl + '/room', { params });
  }

  getRoomsList(): Observable<any> {
    return this.http.get(config.apiUrl + '/rooms', {});
  }

  getRoomsFiltered(roomSize?: string, beamerAvailable?: string, startDate?: string, endDate?: string): Observable<any> {

    const params = new HttpParams()

    if (roomSize !== null) {
      params.set('roomSize', String(this.getRoomSizeId(roomSize)));
    }

    if (beamerAvailable !== null)
      params.set('beamerAvailable', beamerAvailable);

    if (startDate !== null || startDate === "")
      params.set('startDate', startDate);

    if (endDate !== null || endDate === "")
      params.set('endDate', endDate);


    return this.http.get(config.apiUrl + '/rooms', { params });
  }

  getRoomSizeId(roomSize: string): number {
    let roomSizes: Size[] = SIZES;

    switch (roomSize) {
      case roomSizes[1].title:
        return roomSizes[1].id;
      case roomSizes[2].title:
        return roomSizes[2].id;
      case roomSizes[3].title:
        return roomSizes[3].id;
      default: return null;
    }
  }

}
