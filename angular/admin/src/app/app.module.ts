import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './admin/signup/signup.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminService } from './shared/admin.service';
import { AddcategoryComponent } from './admin-profile/addcategory/addcategory.component';
import { AddfoodComponent } from './admin-profile/addfood/addfood.component';
import { BookingComponent } from './admin-profile/booking/booking.component';
import { EditcategoryComponent } from './admin-profile/editcategory/editcategory.component';
import { EditfoodComponent } from './admin-profile/editfood/editfood.component';
import { ReguserComponent } from './admin-profile/reguser/reguser.component';
import { ViewcategoryComponent } from './admin-profile/viewcategory/viewcategory.component';
import { ViewfoodComponent } from './admin-profile/viewfood/viewfood.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AdminProfileComponent,
    AdminComponent,
    AddcategoryComponent,
    AddfoodComponent,
    BookingComponent,
    EditcategoryComponent,
    EditfoodComponent,
    ReguserComponent,
    ViewcategoryComponent,
    ViewfoodComponent,
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
  }, AuthGuard, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
