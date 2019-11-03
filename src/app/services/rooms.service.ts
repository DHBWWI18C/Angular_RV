import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as config from '../CONFIG'; //Konfig-Datei wird gelanden (CONFIG.ts)
import { SIZES } from '../database/db-roomSizes';
import { Size } from '../interfaces/Size';



@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(
    private http: HttpClient
    ) {
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

    let params = new HttpParams();

    if (roomSize != null || roomSize !== '') {
      const id = this.getRoomSizeId(roomSize);
      if (id != null) {
        params = params.set('roomSize', id.toString());
      }
    }

    if (beamerAvailable !== null)
      params = params.set('beamerAvailable', beamerAvailable);

    if (startDate !== null && startDate !== '')
      params = params.set('startDate', startDate);

    if (endDate !== null && endDate !== '')
      params = params.set('endDate', endDate);


    return this.http.get(config.apiUrl + '/rooms', { params });
  }

  isRoomAvailable(roomId: number, startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams()
    .set('roomId' ,roomId.toString())
    .set('startDate', startDate)
    .set('endDate', endDate);

    return this.http.get(config.apiUrl + '/isRoomAvailable', { params });
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
