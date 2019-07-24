import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from '../shared/food.model';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }
  readonly BaseURL = 'http://localhost:3300/foods/';
  getFood() {
    return this.http.get(this.BaseURL);
  }
  insertFood(food: Food) {
    return this.http.post(this.BaseURL, food);
  }
  updateFood(food: Food) {
    console.log(food);
    return this.http.put(this.BaseURL + `${food._id}`, food);
  }
  deleteFood(_id: string) {
    return this.http.delete(this.BaseURL + `${_id}`);
  }
  getfoodid(_id: string) {
    return this.http.get(this.BaseURL + `${_id}`);
  }
}
