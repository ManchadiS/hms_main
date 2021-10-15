import { Component, OnInit } from '@angular/core';
import { ValidationManager } from 'ng2-validation-manager';
import { GlobalServiceService } from '../../../services/global-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {
  form;
  locationid: any;
  username: string;
  UserID: any;
  isClicked: boolean = false;
  constructor(private base_path_service: GlobalServiceService, private toastr: ToastrManager, private router: Router) {
    this.UserID = localStorage.getItem('UserID');
  }

  ngOnInit(): void {
    this.form = new ValidationManager({
      'HospitalName': 'required',
      'EmailID': 'required|email',
      'URL': '',
      'MobileNo': 'required|number|maxLength:10|minLength:10'
    })
  }


  save() {
    if (this.form.isValid()) {
      const body = this.form.getData();
      body.userID = this.UserID;
      this.isClicked = true;
      const url = this.base_path_service.basePathUrl() + 'hospital/saveHospital';
      this.base_path_service.postRequest(url, body)
        .subscribe((res: any) => {
          if (res.status == false) {
            this.toastr.errorToastr(res.msg, 'Oops!');
          } else {
            this.router.navigateByUrl('hospitals');
            this.toastr.successToastr(res.msg, 'Success!');
          }
        });
    }
  }
}
