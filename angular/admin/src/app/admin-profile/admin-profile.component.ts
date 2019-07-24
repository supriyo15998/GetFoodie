import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  adminDetails;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.adminService.getAdminProfile().subscribe(
      data => {
        this.adminDetails = data['admin'];
      },
      err => {
        console.log(err);
      }
    );
  }
  onLogout() {
    this.adminService.deleteToken();
    this.router.navigate(['/login']);
  }
}
