import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../shared/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  readonly BaseUrl = 'http://localhost:3300/categories';
  getCategory() {
    return this.http.get(this.BaseUrl);
  }
  insertCategory(cat: Category) {
    return this.http.post(this.BaseUrl, cat);
  }
  updateCategory(cat: Category)
  {
    return this.http.put(this.BaseUrl + `/${cat._id}`, cat );
  }
  deleteCategory(_id: string)
  {
    return this.http.delete(this.BaseUrl + `/${_id}` );
  }
  getcatid(_id:string)
  {
    return this.http.get(this.BaseUrl + `/${_id}` );
  }
}
