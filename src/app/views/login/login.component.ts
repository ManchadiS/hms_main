import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../services/global-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  userName: any;
  passWord: any;
  message: any;
  data: any;
  constructor(public globalService: GlobalServiceService, private router: Router) {

  }
  ngOnInit(): void {

  }

  login() {
    var body = {
      username: this.userName,
      password: this.passWord
    };
    if (this.validate(body)) {
      const url = this.globalService.basePathUrl() + 'admin/login';
      this.globalService.postRequest(url, body)
        .subscribe(res => {
          console.log("test",res)
          this.data = res
          if (this.data.status == false) {
            this.message = res[0].message;
            setTimeout(() => {
              this.message = '';
            }, 2000);
            return;
          } else {
            localStorage.setItem('access_token', this.data.token);
            localStorage.setItem('refToken', this.data.refToken);
            localStorage.setItem('userid', this.data.Admin._id);
            localStorage.setItem('username', this.data.Admin.Username);
            localStorage.setItem('UserID', this.data.Admin.NewUserID);
            localStorage.setItem('RoleID', this.data.roleData.RoleID)
            if (this.data.Admin.LocationID == 0) {
              localStorage.setItem('selectedLocation', '2');
            } else {
              localStorage.setItem('selectedLocation', this.data.Admin.LocationID);
            }

            //need to do route also
            if (Number(localStorage.getItem('RoleID')) == 2) {
              this.router.navigateByUrl('/dashboard');
            } 
          }
        },
          err => {
            console.log(err);
          });
    }
  }

  validate(data) {
    if (!data.username) {
      this.message = 'Username is Required';
      setTimeout(() => {
        this.message = '';
      }, 2000);
      return false;
    }
    if (!data.password) {
      this.message = 'Password is Required';
      setTimeout(() => {
        this.message = '';
      }, 2000);
      return false;
    }
    return true;
  }


}
