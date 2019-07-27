import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/orders.model';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  readonly baseUrl = 'http://localhost:3300/';
  getOrders(){
    return this.http.get(this.baseUrl + 'adminProfile/viewOrders');
  }
}
