import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './user/about/about.component';
import { HomeComponent } from './user/home/home.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { BooknowComponent } from './user-profile/booknow/booknow.component';
import { BookfoodComponent } from './user-profile/booknow/bookfood/bookfood.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,
    children: [{ path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent }
  ]},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard],
    children: [{ path: 'booknow', component: BooknowComponent },
                { path: 'bookfood', component: BookfoodComponent } 
              ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
