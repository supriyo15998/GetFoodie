import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { OrderService } from '../../shared/order.service';
import { Order } from '../../shared/order.model';
@Component({
  selector: 'app-previous-booking',
  templateUrl: './previous-booking.component.html',
  styleUrls: ['./previous-booking.component.css']
})
export class PreviousBookingComponent implements OnInit {
  public userDetails;
  public email = '';
  public orders = [];
  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.email = this.userDetails.email;
        this.getOrder();
      },
      err => {
        console.log(err);
      });
  }
  getOrder(){
    this.orderService.getOrderUser(this.email).subscribe(
      res => {
        this.orders = res as Order[];
      });
  }

}
