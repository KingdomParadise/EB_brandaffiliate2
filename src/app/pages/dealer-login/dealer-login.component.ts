import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-dealer-login',
  templateUrl: './dealer-login.component.html',
  styleUrls: ['./dealer-login.component.css']
})
export class DealerLoginComponent implements OnInit {
  login: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  hide = true;
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService
  ) { }

  ngOnInit(): void {
    this.login = this._formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submit() {
    if (this.login.valid) {
      this.dataService.dealerLogin(this.login.value).subscribe(res => {
        console.log(res);
        if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
          //this.router.navigateByUrl('/review', { state: { msg: res.successMsg } });
        } else if (res.responseCode == 0) {
          if (res.response.status == 'phoneVerificationPending') {
            this.router.navigateByUrl('/verify');
          } else if(res.response.status == 'new' || res.response.status == 'rejected'){
            this.router.navigateByUrl('/review', { state: { msg: res.successMsg } });
          } else if ((res.response.facebookLink == null) && (res.response.instaLink == null) && (res.response.linkedinLink == null)) {
            localStorage.setItem('token',res.response.token);
            this.router.navigateByUrl('/complete-profile', { state: { data: res.response } });
          }else if(res.response.firstTimeLogin ==1){
            localStorage.setItem('token',res.response.token);
            this.router.navigateByUrl('/dealer-create-password');
          }else{
            localStorage.setItem('token',res.response.token);
            localStorage.setItem('userData',JSON.stringify(res.response));
            
            this.router.navigateByUrl('/dashboard');
          }
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      })
    }
    //this.router.navigateByUrl('/dealer-forgot-password')
  }
  close() {
    this.alertMsg.message = ''
  }
}
