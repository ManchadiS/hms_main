import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { GlobalServiceService } from '../../services/global-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {

  search: FormGroup;
  p: number = 1;
  hospitalList: any;
  numberOfRows: Number = 10;
  searchQuery: any;
  roleDetails: any;
  RoleID: any;
  isHospitalAdd: boolean = false;
  isHospitalEdit: boolean = false;
  isHospitalDelete: boolean = false;
  locationid: string;
  username: string;
  UserID: any;

  constructor(public toastr: ToastrManager, private base_path_service: GlobalServiceService, private fb: FormBuilder, private router: Router) {
    this.search = fb.group({
      search: ['']
    })
    this.RoleID = localStorage.getItem('RoleID');
    this.locationid = localStorage.getItem('selectedLocation');
    this.username = localStorage.getItem('username');
    this.UserID = localStorage.getItem('UserID');
  }

  ngOnInit(): void {
    // this.search.valueChanges
    //   .deboun(1000)
    //   .subscribe(res => {
    //     if (res.search.length != "") {
    //       this.searchMethod()
    //     } else {
    //       this.getAllHospitals('all')
    //     }
    //   })
    this.getAllHospitals('all');
  }
  getAllHospitals(type) {
    const url = this.base_path_service.basePathUrl() + 'hospital/getAllHospitals'
    this.base_path_service.getRequest(url)
      .subscribe(res => {
        console.log(res)
        if (res && (type == 'deleteFire')) {
          this.hospitalList = res;
          this.toastr.successToastr('Hospital Deleted Successfully.', 'Success!');
        } else {
          this.hospitalList = res;
        }
      },
        err => {
          console.log(err);
        });
  }
  searchMethod() {
    this.searchQuery = this.search.controls['search'].value.trim()
    const url = this.base_path_service.basePathUrl() + 'hospital/searchHospitals';
    this.base_path_service.postRequest(url, { name: this.searchQuery })
      .subscribe(res => {
        this.hospitalList = res[0].json;
      },
        err => {
          console.log(err);
        });
  }


  edit(item) {
    var id = item._id;
    this.router.navigateByUrl('hospitals/details/' + id)
  }
  delete(item) {
    var body = {
      id: item,
      LocationID: this.locationid,
      UserName: this.username,
      MainModuleName: 'Hospitals',
      ModuleName: 'Hospital',
      Action: 'Delete',
      userID: this.UserID
    }
    var url = this.base_path_service.basePathUrl() + 'hospital/remove';
    this.base_path_service.postRequest(url, body).subscribe(res => {
      if (res[0].json.n == 1) {
        this.search.controls['search'].setValue('');
        this.getAllHospitals('deleteFire')
      }
    })
  }

  goto() {
    this.router.navigateByUrl('hospitals/addhospital');
  }

}