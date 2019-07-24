import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category.model';
@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  public selectedCategory = new Category();
  public id = '';
  constructor(private route: ActivatedRoute, private router: Router, private catservice: CategoryService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCategory(this.id);
  }
  getCategory(id){
    this.catservice.getcatid(id).subscribe(
      res => {
        this.selectedCategory = res as Category;
        console.log(this.selectedCategory);
      }, (err) => {
        console.log(err);
      });
  }
  onEdit(form: NgForm) {
    if( confirm('Are you sure to update this record?') === true )
    {
      this.catservice.updateCategory(form.value).subscribe(
        res => {
          console.log(res);
        });
        this.router.navigateByUrl('adminProfile/ViewCategory');
        this.refresh();
    }
    else {
      this.router.navigate([ '/EditCategory', this.id ]);
      this.refresh()
    }
  }
  refresh() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCategory(this.id)
  }
}
