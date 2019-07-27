import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './user/home/home.component';
import { AboutComponent } from './user/about/about.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './shared/user.service';
import { BooknowComponent } from './user-profile/booknow/booknow.component';
import { BookfoodComponent } from './user-profile/booknow/bookfood/bookfood.component';
import { FinalBookingComponent } from './user-profile/booknow/final-booking/final-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserProfileComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    LoginComponent,
    SignupComponent,
    BooknowComponent,
    BookfoodComponent,
    FinalBookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
