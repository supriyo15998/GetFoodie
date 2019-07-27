import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../shared/user.service';
import { FoodService } from '../../../shared/food.service';
import { Food } from '../../../shared/food.model'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-final-booking',
  templateUrl: './final-booking.component.html',
  styleUrls: ['./final-booking.component.css']
})
export class FinalBookingComponent implements OnInit {
  today: number = Date.now();
  public id = '';
  public foods = [];
  userDetails;
  constructor(private route: ActivatedRoute, private router: Router, private fservice: FoodService, private sanitizer: DomSanitizer, private userService: UserService) { }
  model = {
    cname: '',
    cemail: '',
    fname: '',
    fdesc: '',
    quant: null,
    price: null,
    cphone: '',
    caddress: '',
    date: ''
  };
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserProfile().subscribe(
      data => {
        this.userDetails = data['user'];
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
}
