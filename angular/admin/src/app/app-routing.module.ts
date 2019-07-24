import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { AddcategoryComponent } from './admin-profile/addcategory/addcategory.component';
import { ViewcategoryComponent } from './admin-profile/viewcategory/viewcategory.component';
import { EditcategoryComponent } from './admin-profile/editcategory/editcategory.component';
import { AddfoodComponent } from './admin-profile/addfood/addfood.component';
import { ViewfoodComponent } from './admin-profile/viewfood/viewfood.component';
import { EditfoodComponent } from './admin-profile/editfood/editfood.component';
import { ReguserComponent } from './admin-profile/reguser/reguser.component';
import { BookingComponent } from './admin-profile/booking/booking.component';

const routes: Routes = [
  { path: 'login', component: AdminComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  { path: 'signup', component: AdminComponent,
    children: [{ path: '', component: SignupComponent }]
  },
  { path: 'adminProfile', component: AdminProfileComponent, canActivate: [AuthGuard],
    children: [{ path: 'AddCategory', component: AddcategoryComponent },
               { path: 'ViewCategory', component: ViewcategoryComponent },
               { path: 'EditCategory/:id', component: EditcategoryComponent },
               { path: 'AddFood', component: AddfoodComponent },
               { path: 'ViewFood', component: ViewfoodComponent },
               { path: 'EditFood/:id', component: EditfoodComponent },
               { path: 'reguser', component: ReguserComponent },
               { path: 'booking', component: BookingComponent }
  ]
  },
  { path: '', redirectTo:'/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
