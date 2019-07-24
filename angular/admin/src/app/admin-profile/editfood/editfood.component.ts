import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category.model';
import { FoodService } from '../../shared/food.service';
import { Food } from '../../shared/food.model';
const URL = 'http://localhost:3300/insertPic';
@Component({
  selector: 'app-editfood',
  templateUrl: './editfood.component.html',
  styleUrls: ['./editfood.component.css']
})
export class EditfoodComponent implements OnInit {
  public id = '';
  public apiUrl = 'http://localhost:3300';
  public selectedFood = new Food();
  public category = [];
  selectedfile: File = null;
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' }); 
  constructor(private route: ActivatedRoute, private router: Router, private catservice: CategoryService, private fservice: FoodService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getfood(this.id);
    this.getCategory();
  }
  getfood(id){
    this.fservice.getfoodid(id).subscribe(
      (res)=>{
        this.selectedFood = res as Food;
        //console.log(this.selectedFood);
      }, (err) => {
        console.log(err);
      });
  }
  getCategory(){
    this.catservice.getCategory().subscribe(
      (res) =>{ 
        this.category = res as Category[];
      });
  }
  onfileselect(event) {
    this.selectedfile = <File>event.target.files[0];
    console.log(this.selectedfile);
  }
  onEdit(form: NgForm){
    if(confirm('Are you sure to update this record?') === true) {
      form.value.photo = this.selectedfile.name;
      
      this.selectedFood.fpic = form.value.photo;
      const fd  = new FormData();
      fd.append('image',this.selectedfile,this.selectedfile.name);
      this.http.post('http://localhost:3300/insertPic', fd).subscribe(
        res => {
          
        });
        // console.log(this.selectedFood);
        this.fservice.updateFood(this.selectedFood).subscribe(
          (res) => {
            console.log(res);
          });
          this.router.navigateByUrl('adminProfile/ViewFood');
    }
    else {
      this.router.navigate ( [ '/EditCategory', this.id ] );
      this.refresh();
    }
  }
  refresh() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getfood(this.id);
  }
  getSafeUrl(fpic){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiUrl + '/' + fpic);
  }
}
