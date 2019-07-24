import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.css']
})
export class BooknowComponent implements OnInit {
  userDetails;
  public category = [];
  public id = '';
  constructor(private route: ActivatedRoute ,private router: Router, private userService: UserService, private catservice: CategoryService) { }

  ngOnInit() {
    // console.log('hello');
    this.getCategory();
  }
  getCategory(){
    this.catservice.getCategory().subscribe(
      res => {
        this.category = res as Category[];
        //console.log(this.category);
      });
  }
  onFood(catname){
    //console.log('onfood_hit');
    //console.log(catname);
    this.router.navigate(['/userProfile/bookfood', {id: catname}]);
  }
}
