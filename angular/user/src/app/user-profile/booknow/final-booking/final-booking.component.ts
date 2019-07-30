import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../shared/user.service';
import { User} from '../../../shared/user.model';
import { FoodService } from '../../../shared/food.service';
import { Food } from '../../../shared/food.model'
import { OrderService } from '../../../shared/order.service';
import { Order } from '../../../shared/order.model';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-final-booking',
  templateUrl: './final-booking.component.html',
  styleUrls: ['./final-booking.component.css']
})
export class FinalBookingComponent implements OnInit {
  
  public id = '';
  public foods = [];
  public userDetails='';
  public selectedOrder = new Order();
  constructor(private route: ActivatedRoute, private router: Router, private fservice: FoodService, private sanitizer: DomSanitizer, private userService: UserService, private orderService: OrderService) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserProfile().subscribe(
      res => {
       // console.log(data);
        this.userDetails = res['user'];
        console.log(this.userDetails);
      },
      err => {
        console.log(err);
      });
      this.getFoodDetails(this.id);
  }
  getFoodDetails(id){
    this.fservice.getfoodid(id).subscribe(
      res => {
        this.foods = res as Food[];
        console.log(this.foods);
      });
  }
  onSubmit(form: NgForm){
    console.log(form.value);
   /* this.orderService.placeOrder(this.selectedOrder).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
      alert('Order Placed!');
      this.router.navigateByUrl('/userProfile/booknow');*/
  }
}
