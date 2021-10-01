import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  otpForm: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor(
    public router: Router,
    public _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    public location: Location
  ) {

  }
  ngOnInit() {
    this.otpForm = this._formBuilder.group({
      otpNumber: [null, Validators.required],
      personalPhone: ['']
    });
  }
  onSubmit() {
    if (this.otpForm.valid) {
      this.otpForm.patchValue({
        personalPhone: "9844038037" //localStorage.getItem('personalPhone')
      })
      this.dataService.verifyDealerRegOtp(this.otpForm.value).subscribe(res => {
        console.log(res);
        if (res.responseCode == 0) {
          //this.router.navigate(['review'], { state: {msg: res.successMsg} });
          this.router.navigateByUrl('/review', { state: { msg: res.successMsg } });
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      });
    }
    //this.router.navigateByUrl('/review');
  }
  close() {
    this.alertMsg.message = ''
  }
  goBack(){
    this.location.back();
  }
}
