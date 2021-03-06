import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-dealer-forget-password',
  templateUrl: './dealer-forget-password.component.html',
  styleUrls: ['./dealer-forget-password.component.css'],
})
export class DealerForgetPasswordComponent implements OnInit {
  createPassword: FormGroup;
  alertMsg: any = {
    type: '',
    message: '',
  };
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dataService: InitialDataService
  ) {}

  ngOnInit(): void {
    this.createPassword = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
      cnfPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }
  get f1() {
    return this.createPassword.controls;
  }
  close() {
    this.alertMsg.message = '';
  }
  submit() {
    if (
      this.createPassword.value.newPassword !=
      this.createPassword.value.cnfPassword
    ) {
      alert('Confirm password does not match');
      return;
    }
    if (this.createPassword.valid) {
      //this.createPassword.removeControl('cnfPassword');
      delete this.createPassword.value.cnfPassword;

      this.dataService.updateDealerPassword(this.createPassword.value).subscribe( res =>{
        if(res.responseCode == 0){
          this.alertMsg.type = 'succsess';
          this.alertMsg.message = res.successMsg
        }else if(res.responseCode == -1){
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        }else{
          this.alertMsg.type = 'danger';
          this.alertMsg.message = "Server error"
        }
      })
    }
  }
}
