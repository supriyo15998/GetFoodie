import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from './admin.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  selectedAdmin: Admin = {
    fullName: '',
    email: '',
    password: ''
  };
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }
  //Http methods call here
  BaseUrl = 'http://localhost:3300'
  postAdmin(admin: Admin){
    return this.http.post(this.BaseUrl+'/admin/signup',admin,this.noAuthHeader);
  }
  login(authCredentials) {
    return this.http.post(this.BaseUrl+'/admin/login',authCredentials,this.noAuthHeader);
  }
  getAdminProfile() {
    return this.http.get(this.BaseUrl+'/adminProfile');
  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getAdminPayload() {
    //this.deleteToken();
    var token = this.getToken();
    if (token) {
      var adminPayload = atob(token.split('.')[1]);
      return JSON.parse(adminPayload);
    }
    else
      return null;
  }
  isLoggedIn() {

    var adminPayload = this.getAdminPayload();
    if(adminPayload)
      return adminPayload.exp > Date.now() / 1000;
    else 
      return false;
  }
}
