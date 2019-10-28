import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as config from '../CONFIG'; //Konfig-Datei wird gelanden (CONFIG.ts)



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get(config.apiUrl + '/bookings');
  }

  getById(id: string): Observable<any> {
    const params = new HttpParams()
      .set('id', id);

    return this.http.get(config.apiUrl + '/bookings', { params });
  }

  DeleteById(id: string): Observable<any> {
    const params = new HttpParams()
      .set('id', id);

    return this.http.delete(config.apiUrl + '/bookings', { params });
  }

  create(roomId: number, startDate: string, endDate: string, food: boolean, wifi: boolean): Observable<any> {
    let params = this.setParams(roomId.toString(), startDate, endDate, food, wifi);

    return this.http.post(config.apiUrl + '/booking', params);
  }

  update(roomId: string, startDate: string, endDate: string, food: boolean, wifi: boolean): Observable<any> {
    let params = this.setParams(roomId, startDate, endDate, food, wifi);

    return this.http.put(config.apiUrl + '/booking', params);
  }

  getPrice(roomId: string, startDate: string, endDate: string, food: boolean, wifi: boolean): Observable<any> {
    let params = this.setParams(roomId, startDate, endDate, food, wifi);

    return this.http.post(config.apiUrl + '/booking/price', params);
  }

  private setParams(roomId: string, startDate: string, endDate: string, food: boolean, wifi: boolean): HttpParams {
    const params = new HttpParams()
      .set('roomId', roomId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    if (food) {
      params.set('food', '1');
    } else {
      params.set('food', '0');
    }
    if (wifi) {
      params.set('wifi', '1');
    } else {
      params.set('wifi', '0');
    }

    return params;
  }

}
