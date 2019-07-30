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
  userDetails;
  public id = '';
  public selectedFood = new Food();
  myDate = new Date();
  public mydate;
  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private router: Router, private fservice: FoodService, private sanitizer: DomSanitizer, private userService: UserService, private orderService: OrderService) { }
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails);
      },
      err => {
        console.log(err);
      });
      this.id = this.route.snapshot.paramMap.get('id');
      this.getFoodDetails(this.id);  
    }
  getFoodDetails(id){
    this.fservice.getfoodid(id).subscribe(
      res => {
        this.selectedFood = res as Food;
        console.log(this.selectedFood);
      },
      err => {
        console.log(err);
      });
  }
  onSubmit(form: NgForm){
    console.log(form.value);
    form.value.price = form.value.fprice * form.value.quan;
    form.value.date = this.mydate;
    this.orderService.placeOrder(form.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
      alert('Order Placed!');
      this.router.navigateByUrl('/userProfile/booknow');
  }
}
