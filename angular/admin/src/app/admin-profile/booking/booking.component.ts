import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../shared/orders.service';
import { Order } from '../../shared/orders.model';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public orders = [];
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders(){
    this.orderService.getOrders().subscribe(
      res => {
        this.orders = res as Order[];
        console.log(this.orders);
      });
  }
}
