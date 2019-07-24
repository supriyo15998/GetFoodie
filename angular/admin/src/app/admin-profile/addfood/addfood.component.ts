import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FoodService } from '../../shared/food.service';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category.model';
import { Food } from '../../shared/food.model';
const URL = 'http://localhost:3300/insertPic';
@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent implements OnInit {
  public selectedFood = new Food();
  public category = [];
  selectedfile: File = null;
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  constructor(private http: HttpClient, private router: Router, private catservice: CategoryService, private foodservice: FoodService) { }

  ngOnInit() {
    this.getCategory();
  }
  getCategory(){
    this.catservice.getCategory().subscribe(
      res => {
        this.category = res as Category[];
      });
  }
  onfileselect(event) {
    this.selectedfile = <File>event.target.files[0];
    console.log(this.selectedfile);
  }
  onSubmit(form: NgForm) {
    form.value.photo = this.selectedfile.name;
    this.selectedFood.fpic = form.value.photo;
    const fd = new FormData();
    fd.append('image', this.selectedfile, this.selectedfile.name);
    this.http.post('http://localhost:3300/insertPic', fd).subscribe(
      res => {

      });
      this.foodservice.insertFood(this.selectedFood).subscribe(
        data => console.log('Success', data),
        error => console.log('Error', error)
      );
      alert('Data saved successfully!');
      this.router.navigateByUrl('adminProfile/ViewFood');
  }
}
