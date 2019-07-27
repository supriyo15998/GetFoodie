import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FoodService } from '../../../shared/food.service';
import { Food } from '../../../shared/food.model';
@Component({
  selector: 'app-booknow',
  templateUrl: './bookfood.component.html',
  styleUrls: ['./bookfood.component.css']
})
export class BookfoodComponent implements OnInit {
  public id = '';
  public foods = [];
  public apiurl = 'http://localhost:3300';

  constructor(private route: ActivatedRoute, private router: Router, private fservice: FoodService, private sanitizer: DomSanitizer) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ngOnInit();
   }

  ngOnInit() {
    console.log('hello bookfood');
    this.id = this.route.snapshot.paramMap.get('id');
    this.getFoodDetails(this.id);
  }
  getFoodDetails(id) {
    this.fservice.getfoodcatid(id).subscribe(
      res => {
        this.foods = res as Food[];
      });
  }
  getSafeUrl(fpic){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiurl + '/' + fpic);
  }
  onBook(id){
    this.router.navigate(['userProfile/finalBooking', { id: id }]);
  }
}
