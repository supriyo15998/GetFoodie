import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reguser } from './reguser.model';
@Injectable({
  providedIn: 'root'
})
export class VwuserService {

  constructor(private http: HttpClient) { }
  readonly BaseUrl = 'http://localhost:3300/adminProfile/regUser';
  getUser() {
    return this.http.get(this.BaseUrl);
  }
}
