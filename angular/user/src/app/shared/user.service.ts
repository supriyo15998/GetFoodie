import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  };
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3300/';
  postUser(user: User){
    return this.http.post(this.baseUrl+'users/signup',user,this.noAuthHeader);
  }
  login(authcredentials){
    return this.http.post(this.baseUrl+'users/login',authcredentials,this.noAuthHeader);
  }
  getUserProfile(){
    return this.http.get(this.baseUrl+'userProfile');
  }
  //helper methods
  setToken(token: string){
    localStorage.setItem('token', token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getUserPayload(){
    var token = this.getToken();
    if(token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now() / 1000;
    else 
      return false;
  }
}
