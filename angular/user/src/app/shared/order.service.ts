import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/order.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  readonly baseUrl = 'http://localhost:3300/';
  placeOrder(order: Order){
    return this.http.post(this.baseUrl + 'userProfile/placeOrder', order);
  }
  getOrderUser(cemail: string){
    return this.http.get(this.baseUrl+ 'userProfile/getOrderByUser/' + `${cemail}`);
  }
}
