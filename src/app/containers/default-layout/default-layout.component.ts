import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { GlobalServiceService } from '../../services/global-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  navItems = navItems;
  locationList: any;
  roleID: any;
  userDetails: any;
  userID: any;
  locationid: any;
  roleDetails: any;

  constructor(public globalService: GlobalServiceService) {
    this.locationid = localStorage.getItem('selectedLocation');
    this.roleID = localStorage.getItem('RoleID');
    this.userID = localStorage.getItem('userid');
    // this.navItems = []
    const url = this.globalService.basePathUrl() + 'role/getRoleByRoleID/' + this.roleID;
    this.locationListApi();
    this.getUserDetails();
    this.globalService.getRequest(url)
      .subscribe(res => {
        this.roleDetails = res;
        // var hospitals = 
        
        // if (this.roleDetails.hospitalRights.length != 0) {
        //   this.navItems.push(hospitals);
        //   console.log(this.navItems)
        // }
      })

    
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  getUserDetails() {
    const url = this.globalService.basePathUrl() + 'user/details/' + this.userID;
    this.globalService.getRequest(url)
      .subscribe(res => {
        if (res[0]) {
          this.userDetails = res[0];
        }
      },
        err => {
          console.log(err);
        });
  }


  locationListApi() {
    // this.operator = localStorage.getItem('username');
    const url = this.globalService.basePathUrl() + 'hospitalLocation/getAllHospitalLocations';
    this.globalService.getRequest(url)
      .subscribe(res => {
        if (res[0]) {
          this.locationList = res;
        }
      },
        err => {
          console.log(err);
        });
  }

  selectedlocation(locationValue) {
    this.locationid = localStorage.setItem('selectedLocation', locationValue);
    window.location.reload();
  }


}
