import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './food.model';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }
  readonly baseURL =  'http://localhost:3300/';
  getFood() {
    return this.http.get(this.baseURL) ;
  }
  insertFood( food: Food) {
    return this.http.post(this.baseURL, food);
  }
  updateFood(food: Food) {
    return this.http.put(this.baseURL + `/${food._id}`, food);
  }
  deleteFood(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  getfoodcatid(category_id: string) {
    return this.http.get(this.baseURL + 'foods/userfood' + `/${category_id}`);
  }
  getfoodid(_id: string) {
    return this.http.get(this.baseURL+ 'foods/' + `${_id}`);
  }
}
