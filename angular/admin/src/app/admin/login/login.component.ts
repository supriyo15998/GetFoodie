import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../shared/admin.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }
  model = {
    email: '',
    password: ''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if(this.adminService.isLoggedIn())
      this.router.navigateByUrl('/adminProfile');
  }
  onSubmit(form: NgForm) {
    this.adminService.login(form.value).subscribe(
      res => {
        this.adminService.setToken(res['token']);
        this.router.navigateByUrl('/adminProfile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
