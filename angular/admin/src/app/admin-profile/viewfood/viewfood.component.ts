import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Uploads } from '../../../../../../server';
import { Router } from '@angular/router';
import { FoodService } from '../../shared/food.service';
import { Food } from '../../shared/food.model';
import { Category } from '../../shared/category.model';
declare var require: any;
@Component({
  selector: 'app-viewfood',
  templateUrl: './viewfood.component.html',
  styleUrls: ['./viewfood.component.css']
})
export class ViewfoodComponent implements OnInit {
  public apiurl = 'http://localhost:3300';
  trustedUrl;
  public foods = [];
  constructor(private fservice: FoodService, private sanitizer: DomSanitizer) { 
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.apiurl);
   }
   getFoodDetails(){
     this.fservice.getFood().subscribe(
       (res) => {
         this.foods = res as Food[];
       });
   }
   getSafeUrl(fpic){
     return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiurl + '/' + fpic );
   }
  ngOnInit() {
    this.getFoodDetails();
  }
  refresh(){
    this.fservice.getFood().subscribe(
      (res) => {
        this.foods = res as Food[];
      });
  }
  onDelete(_id:string) {
    if( confirm('Are you sure to delete this record?') === true ) {
      this.fservice.deleteFood(_id).subscribe(
        (res) => {

        });
        this.refresh();
    }
  }
}
