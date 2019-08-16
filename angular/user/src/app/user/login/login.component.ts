import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router) { }
  model = {
    email: '',
    password: ''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public serverErrorMessages: string;
  ngOnInit() {
    if(this.userService.isLoggedIn())
      this.router.navigateByUrl('/userProfile');
  }
  onSubmit(form: NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userProfile');
      },
      err => {
        const serverErrorMessages = err.error.error;

        console.log(serverErrorMessages);
        //alert(this.serverErrorMessages);
        
        Object.keys(serverErrorMessages).forEach(prop => {
          const formCtrl = this.form.get(prop);
          if(formCtrl) {
            formCtrl.setErrors({
              serverError: serverErrorMessages[prop]
            });
          }
        });
    });
  }
}
