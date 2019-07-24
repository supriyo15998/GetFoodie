import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  readonly baseUrl = 'http://localhost:3300/categories'
  getCategory(){
    return this.http.get(this.baseUrl);
  }
  insertCategory(cat: Category){
    return this.http.post(this.baseUrl, cat);
  }
  updateCategory(cat: Category){
    return this.http.put(this.baseUrl, cat);
  }
  deleteCategory(_id: string) {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }
  getcatid(_id: string) {
    return this.http.get(this.baseUrl + `/${_id}`);
  }
}
