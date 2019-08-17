import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl} from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { formatNumber } from '@angular/common';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form = new FormGroup ({
    fullName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  public serverErrorMessages: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm){
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        alert('Account Created Successfully!');
        setTimeout(()=> this.showSucessMessage = false,4000);
        this.resetForm(form);
      },
      err => {
        // if(err.status = 422)
        // {
        //   this.serverErrorMessages = err.error.join('<br/>');
        // }
        // else {
        //   this.serverErrorMessages = 'Something went wrong!';
        // }
        const serverErrorMessages = err.error.error;
        console.log(serverErrorMessages);
        Object.keys(serverErrorMessages).forEach(prop=>{
          const formCtrl = this.form.get(prop);
          if(formCtrl)
          {
            formCtrl.setErrors({
              serverError: serverErrorMessages[prop]
            });
          }
        });
      });
  }

  resetForm(form: NgForm){
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages='';
  }
}
