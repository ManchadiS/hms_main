import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServiceService } from '../../../services/global-service.service';
import { ValidationManager } from 'ng2-validation-manager';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-hospital-details',
  templateUrl: 'hospital-details.component.html',
  styleUrls: ['hospital-details.component.scss']
})
export class HospitalDetailsComponent implements OnInit {
  form;
  id: any;
  hospitalDetails: any;
  HospitalName: any;
  username: any;
  locationid: string;
  UserID: any;
  isClicked: boolean = false;

  constructor(public toastr: ToastrManager, private router: Router, public activatedRouter: ActivatedRoute, private base_path_service: GlobalServiceService) {
  }

  ngOnInit(): void {
    this.form = new ValidationManager({
      'HospitalName': 'required',
      'EmailID': 'required|email',
      'URL': '',
      'MobileNo': 'required|number|maxLength:10|minLength:10'

    })

    this.activatedRouter.params.subscribe(params => {
      this.id = params['id'];
      this.getUserdetails();
    });

  }


  update() {
    if (this.form.isValid()) {
      const body = this.form.getData();
      body.id = this.id;
      this.isClicked = true;
      const url = this.base_path_service.basePathUrl() + 'hospital/update';
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

  getUserdetails() {
    const url = this.base_path_service.basePathUrl() + 'hospital/getHospitalByID/' + this.id;
    this.base_path_service.getRequest(url)
      .subscribe((res: any) => {
        if (res) {
          this.hospitalDetails = res;
          this.form.setValue({
            'HospitalName': this.hospitalDetails.HospitalName,
            'EmailID': this.hospitalDetails.EmailID,
            'URL': this.hospitalDetails.URL,
            'MobileNo': this.hospitalDetails.MobileNo
          })
        }
      },
        err => {
          console.log(err);
        });

  }

}