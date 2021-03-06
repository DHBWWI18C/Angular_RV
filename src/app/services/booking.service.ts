import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as config from '../CONFIG'; //Konfig-Datei wird geladen (CONFIG.ts)
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  getList(): Observable<any> {
    let params = new HttpParams()
      .set('token', this.authService.getSessionToken());
    return this.http.get(config.apiUrl + '/bookings', { params });
  }

  getById(id: string): Observable<any> {
    const params = new HttpParams()
      .set('id', id)
      .set('token', this.authService.getSessionToken());

    return this.http.get(config.apiUrl + '/booking', { params });
  }

  DeleteById(id: string): Observable<any> {
    const params = new HttpParams()
      .set('id', id)
      .set('token', this.authService.getSessionToken());

    return this.http.delete(config.apiUrl + '/bookings', { params });
  }

  create(roomId: number, startDate: string, endDate: string, food: boolean, wifi: boolean, price: number): Observable<any> {
    let params = this.setParams(roomId.toString(), startDate, endDate, food, wifi)
        .set('price', price.toString())
      .set('token', this.authService.getSessionToken());

    return this.http.post(config.apiUrl + '/booking', params);
  }

  update(roomId: string, startDate: string, endDate: string, food: boolean, wifi: boolean): Observable<any> {
    let params = this.setParams(roomId, startDate, endDate, food, wifi);

    return this.http.put(config.apiUrl + '/booking', params);
  }

  getPrices(roomId: number, startDate: string, endDate: string, food: boolean, wifi: boolean): Observable<any> {
    let params = this.setParams(roomId.toString(), startDate, endDate, food, wifi);

    return this.http.get(config.apiUrl + '/price', { params });
  }

  private setParams(roomId: string, startDate: string, endDate: string, food: boolean, wifi: boolean): HttpParams {
    let params = new HttpParams()
      .set('roomId', roomId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    if (food) {
      params = params.set('food', '1');
    } else {
      params = params.set('food', '0');
    }
    if (wifi) {
      params = params.set('wifi', '1');
    } else {
      params = params.set('wifi', '0');
    }

    return params;
  }

}
